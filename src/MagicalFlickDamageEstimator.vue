<template>
  <div id="app">
    <TheNavbar>マジフリ ダメージ見積</TheNavbar>
    <section class="section">
      <div class="container">
        <TheManual></TheManual>
        <b-message v-if="!wasmLoadSuccess" type="is-danger">お使いのブラウザで当ツールはご利用になれません。</b-message>
        <NumberInput
          label="出現ドロップ種類"
          v-model.number="params.colors"
          min="1"
          max="6"
          step="1"
          placeholder="出現ドロップ種類(最大6)"
        ></NumberInput>
        <NumberInput
          label="盤面ドロップ数"
          v-model.number="params.drops"
          min="1"
          max="25"
          step="1"
          placeholder="盤面上に現存するドロップ数(最大25)"
        ></NumberInput>
        <NumberInput
          label="総攻撃力"
          v-model.number="params.attack"
          min="1"
          max="100000"
          step="1"
          placeholder="同属性ユニットの総攻撃力"
        ></NumberInput>
        <NumberInput
          label="攻撃力倍率"
          v-model.number="params.magnification"
          min="1"
          max="100"
          step="0.01"
          placeholder="リーダースキルによる攻撃力増加率"
        ></NumberInput>
        <NumberInput
          label="変換対象ドロップ"
          v-model.number="params.targets"
          min="0"
          max="5"
          step="1"
          placeholder="スキルによる変換対象ドロップ色数"
        ></NumberInput>
        <NumberInput
          label="ドロップ成長度"
          v-model.number="params.growth"
          min="0"
          max="100"
          step="1"
          placeholder="スキルによるドロップ成長度"
        ></NumberInput>
        <SelectEffectiveness
          :options="effectivenesses"
          v-model.number="params.effectiveness"
          label="属性間相性"
          placeholder="属性間相性"
        ></SelectEffectiveness>
        <MessageResult :star="star" :damage="damage"></MessageResult>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed,
  ref
} from '@vue/composition-api';
import TheNavbar from './components/TheNavbar.vue';
import TheManual from './components/TheManual.vue';
import NumberInput from './components/NumberInput.vue';
import SelectEffectiveness from './components/SelectEffectiveness.vue';
import MessageResult from './components/MessageResult.vue';
// import { getDamage, getStar } from './model';
import { loadWasmModule } from './wasm-loader-browser';

interface Params {
  colors: number;
  drops: number;
  attack: number;
  magnification: number;
  targets: number;
  growth: number;
  effectiveness: number;
}

export default createComponent({
  components: {
    TheNavbar,
    TheManual,
    NumberInput,
    SelectEffectiveness,
    MessageResult
  },
  props: {},
  setup(props, context) {
    const effectivenesses = reactive([
      { text: '有利（ダメージ2倍）', value: 2 },
      { text: '等倍', value: 1 },
      { text: '不利（ダメージ半減）', value: 0.5 }
    ]);
    const params = reactive<Params>({
      colors: 6,
      drops: 25,
      attack: 10000,
      magnification: 1,
      targets: 0,
      growth: 0,
      effectiveness: 1
    });

    const wasmLoadSuccess = ref<boolean>(true);
    const getDamage = ref<Function>(() => 0);
    const getStar = ref<Function>(() => 0);
    (async () => {
      try {
        const module = await loadWasmModule('wasm/optimized.wasm');
        if (
          module.instance.exports.getDamage instanceof Function &&
          module.instance.exports.getStar instanceof Function
        ) {
          getDamage.value = module.instance.exports.getDamage;
          getStar.value = module.instance.exports.getStar;
        } else {
          wasmLoadSuccess.value = false;
        }
      } catch (error) {
        wasmLoadSuccess.value = false;
      }
    })();

    const star = computed(() =>
      getStar.value(params.colors, params.drops, params.targets, params.growth)
    );
    const damage = computed(() =>
      getDamage.value(
        params.colors,
        params.drops,
        params.attack,
        params.magnification,
        params.targets,
        params.growth,
        params.effectiveness
      )
    );

    return {
      effectivenesses,
      params,
      star,
      damage,
      wasmLoadSuccess,
      getDamage,
      getStar
    };
  }
});
</script>

<style>
</style>
