<template>
  <b-collapse class="panel" :open.sync="isManualOpen">
    <div slot="trigger" class="panel-heading">
      <b-icon v-if="isManualOpen" icon="menu-up"></b-icon>
      <b-icon v-else icon="menu-down"></b-icon>
      <span>動作ブラウザ・更新履歴</span>
    </div>
    <div class="panel-block">
      <div class="content">
        <b-message type="is-danger" class="has-text-weight-bold">注: マジカルフリック（マジフリ）はサービス終了済みです</b-message>
        <h2 class="is-size-5">動作ブラウザ</h2>
        <p>　Google Chrome, Firefoxの現行版で動作を確認しています。2019-12-27のアップデートより、Internet Explorerは非対応となりました。</p>
        <h2 class="is-size-5">更新履歴</h2>
        <dl>
          <dt>
            <time>2019-12-27</time>
          </dt>
          <dd>計算モジュールをWebAssembly化</dd>
          <dd>Internet Explorer対応の取りやめ</dd>
          <dt>
            <time>2018-12-27</time>
          </dt>
          <dd>計算結果の即時表示化</dd>
          <dd>ページデザイン変更</dd>
          <dt>
            <time>2017-12-27</time>
          </dt>
          <dd>不利属性への与ダメージ計算に対応</dd>
          <dd>数値入力欄に有効入力値範囲設定</dd>
          <dt>
            <time>2015-07-27</time>
          </dt>
          <dd>初版公開</dd>
        </dl>
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  data: function() {
    return {
      isManualOpen: false
    };
  }
};
</script>