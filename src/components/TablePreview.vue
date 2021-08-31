<template>
  <div class="table-preview">
    <div class="photo">
      <img src="../assets/baccarat/dealers/MAFER.jpg" />
      <p>MAFER</p>
    </div>
    <div class="tableCon">
      <div class="preview-header">
        <p id="tableId">TableId</p>
        <div class="limit-options">limit</div>
      </div>
      <div class="stats-table"></div>
      <div class="preview-footer">
        <div class="stats">
          <span></span>
          <p id="bankerCounts">0</p>
          <span></span>
          <p id="playerCounts">0</p>
          <span></span>
          <p id="tieCounts">0</p>
        </div>
        <div></div>
        <button @click="goToTable">{{ $t("baccarat.play") }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TablePreview",
  methods: {
    goToTable() {
      this.$router.push({ name: "BaccaratTable" });
    },
  },
};
</script>

<style scoped lang="scss">
.table-preview {
  min-width: 30%;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  background: #000;
  border: 1px solid transparent;
  border-image: linear-gradient(
    1deg,
    #d0a651 0%,
    #3c2904 26%,
    #b27a1f 49%,
    #ebe0a9 62%,
    #cbad55 100%
  );
  border-image-slice: 1;
  cursor: pointer;

  &:hover {
    border: 1px solid #efb807;
    box-shadow: 0px 0px 8px 2px rgb(183 141 73 / 80%);
  }

  &:hover button {
    background-image: linear-gradient(0deg, #f3bd00 0%, #fff800 100%);
  }

  .photo {
    img {
      width: 120px;
      height: 144px;
    }

    p {
      width: 100%;
      height: 33px;
      line-height: 35px;
      background: #000;
      color: #bfbfbf;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 0;
    }
  }

  .tableCon {
    width: calc(100% - 121px);

    .preview-header {
      color: #fff;
      background: #1f1f1f;
      display: flex;
      justify-content: space-between;

      #tableId {
        font-size: 15px;
        line-height: 37px;
        text-indent: 10px;
        flex: 1;
        margin: 0;
        padding-right: 5px;
        border-right: 1px solid #333;
      }
    }

    .stats-table {
      height: 107px;
      background-color: white;
    }

    .preview-footer {
      background-image: linear-gradient(-1deg, #313131 0%, #000000 100%);
      display: flex;

      .stats {
        display: flex;
        align-items: baseline;
        color: #fff;
        line-height: 17px;
        flex: 1;

        span {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          text-indent: -9999px;
          margin: 13px 5px 0 5px;
          float: left;

          &:first-child {
            background: #b80909;
          }

          &:nth-child(3n) {
            background: #216bb0;
          }

          &:nth-child(5n) {
            background: #80b632;
          }
        }

        p {
          font-size: 13px;
          margin-right: 3px;
          float: left;
        }
      }

      button {
        width: 60px;
        background-image: linear-gradient(0deg, #f3bd00 0%, #fff800 100%);
        cursor: pointer;
      }
    }
  }
}
</style>