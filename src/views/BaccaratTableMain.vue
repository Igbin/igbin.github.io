<template>
  <div class="mainTable-wrapper">

    <Header :user="parent" />

    <div class="video-box">
      <section class="info-left">
        <div class="title">
          <div class="title-left">
            <p id="curGameType">Baccrat</p>
            <p id="curTableId">Table_1</p>
          </div>
          <div class="title-right">
            <p>Game</p>
            <span id="gamesCount"></span>
          </div>
        </div>
        <h5>
          <span>Dealer:</span>
          <span id="dealerName">dealerName</span>
        </h5>
        <div class="gameInfoCard"></div>
      </section>

      <section class="info-right">
        <div class="countDown">
          <div class="num-CountDown">
            <p id="counter">30</p>
            <span>SEC</span>
          </div>
          <div class="scale-CountDown"></div>
        </div>
        <ul class="info-stats">
          <li>
            <span>{{$t('baccarat.banker')}}</span>
            <span id="banker_percent">34%</span>
          </li>
          <li>
            <span>{{$t('baccarat.player')}}</span>
            <span id="player_percent">60%</span>
          </li>
          <li>
            <span>{{$t('baccarat.tie')}}</span>
            <span id="tie_percent">2%</span>
          </li>
          <li>
            <span>{{$t('baccarat.total')}}</span>
            <span id="totalBets">344.541.4</span>
          </li>
        </ul>
      </section>

      <a class="change-table">{{$t('baccarat.tables')}}</a>

      <section class="betZone">
        <div class="betZone-header"></div>
        <div class="betZone-content">
          <div class="player-pair bet-box player-box">
            <p id="playerPairCurrentBet">15,791.1</p>
            <h2>{{$t('baccarat.playerPair')}}</h2>
            <h3 id="playerPairOdds">1:11</h3>
          </div>
          <div class="betZone-centrArea">
            <div class="up_set">
              <div class="perfect_pair bet-box specific-box">
                <p id="phoenixCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.perfectPair')}}</h2>
                <h3 id="phoenixOdds">1:11</h3>
              </div>
              <div class="betBox-Big bet-box specific-box">
                <p id="bigCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.big')}}</h2>
                <h3 id="smallOdds">1:11</h3>
              </div>
              <div class="betBox-Super bet-box" style="display: none">
                <p id="superCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.super')}}</h2>
                <h3 id="bigOdds">1:11</h3>
              </div>
              <div class="betBox-Small bet-box specific-box">
                <p id="smallCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.small')}}</h2>
                <h3 id="bigOdds">1:11</h3>
              </div>
              <div class="betBox-Turtle bet-box specific-box">
                <p id="turtleCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.anyPair')}}</h2>
                <h3 id="turtleOdds">1:11</h3>
              </div>
            </div>
            <div class="down_set">
              <div class="betBox-PlayerBonus bet-box player-box">
                <p id="playerBonusCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.bonus')}}</h2>
              </div>
              <div class="betBox-Player bet-box player-box">
                <p id="playerCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.player').toUpperCase()}}</h2>
                <h3 id="playerOdds">1:11</h3>
              </div>
              <div class="betBox-Tie bet-box">
                <p id="tieCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.tie').toUpperCase()}}</h2>
                <h3 id="tiePairOdds">1:11</h3>
              </div>
              <div class="betBox-Small bet-box banker-box">
                <p id="bankerCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.banker').toUpperCase()}}</h2>
                <h3 id="bankerOdds">1:11</h3>
              </div>
              <div class="betBox-BankerBonus bet-box banker-box">
                <p id="bankerBonusCurrentBet">15,791.1</p>
                <h2>{{$t('baccarat.bonus')}}</h2>
              </div>
            </div>
          </div>
          <div class="chips_banker_pair bet-box banker-box">
            <p id="playerPairCurrentBet">15,791.1</p>
            <h2>{{$t('baccarat.bankerPair')}}</h2>
            <h3 id="playerPairOdds">1:11</h3>
          </div>
        </div>
        <div class="functionZone">
          <div class="tool_btn"></div>
          <ul class="chips">
            <li class="chip_10">
              <p>10</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_20">
              <p>20</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_50">
              <p>50</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_100">
              <p>100</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_200">
              <p>200</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_10k">
              <p>10k</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
            <li class="chip_set">
              <p>SET</p>
              <span class="shadow"></span>
              <span class="line"></span>
              <span class="ring"></span>
            </li>
          </ul>
          <div class="good_tips"></div>
          <div class="total-bet">
            <p>{{$t('baccarat.totalBet')}}</p>
            <p id="playerTotalCurrentBet"></p>
          </div>
          <div class="function-buttons">
            <div class="confirm-but"><p>Confirm</p></div>
            <div class="repeat-but"></div>
            <div class="cancel-but"></div>
          </div>
        </div>
      </section>
    </div>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/baccaratEntry">baccaratEntry</router-link>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'BaccaratTableMain',
  components: {
    Header
  },
  data() {
    return {
      parent: this.$options.name
    }
  }
}
</script>
<style scoped lang="scss">
.mainTable-wrapper {

  .video-box {
    position: relative;
    background: white;
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 900px;
    
    .info-left {
      width: 20%;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 250;
      background: #000;
      box-shadow: 0 3px 5px 0 rgb(0 0 0 / 50%);

      .title {
        display: flex;
        padding: 8px 15px;

        .title-left {
          flex: 1;
          color: #EFB807;
          font-size: 16px;
        }

        .title-right {
          flex: 1.4;
          font-size: 14px;
          color: #CEBD78;
          padding-top: 1px;
        }
      }

      h5 {
        display: flex;
        justify-content: space-around;
        font-size: 15px;
        font-weight: normal;
        color: #CFC18A;
        padding: 6px 15px;
        border-bottom: 1px #000 solid;
      }
    }

    .info-right {
      width: 15%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: 0 3px 5px 0 rgb(0 0 0 / 50%);
      padding: 0 5px 0 5px;
      z-index: 250;

      .countDown {

        .num-CountDown {
          height: 100px;
          line-height: 100px;
          text-align: center;

          #counter {
            display: inline;
            color: #ff2800;
            font-size: 7vw;
          }

          span {
            color: #e2836c;
            font-size: 15px;
          }
        }
      }

      .info-stats {
        list-style-type: none;
        padding: 10px;
        margin: 5px;

        li {
          display: flex;
          justify-content: space-between;

          span {
            color: #E8E8E8;
          }

          &:first-child span:first-child {
            color: #b80909;
          }

          &:nth-child(2n) span:first-child {
            color: #216bb0;
          }

          &:nth-child(3n) span:first-child {
            color: #80b632;
          }
        }
      }
    }

    .change-table {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: -2px;
      z-index: 50;
      width: 55px;
      height: 155px;
      background: url("../assets/baccarat/bg_side_change.svg") center right no-repeat;
      background-size: 100% 100%;
      color: #BEBEBE;
      font-size: 10px;
      padding-left: 7px;
      padding-right: 2px;
      flex-direction: column;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: "";
        display: block;
        width: 21px;
        height: 18px;
        background: url("../assets/baccarat/icon_change.svg") center center no-repeat;
        background-size: 100% 100%;
        margin-bottom: 5px;
      }
    }

    .betZone {
      position: absolute;
      transform: translate(-50%, 0);
      top: 45%;
      left: 50%;
      z-index: 10;

      .betZone-content {
        transform: perspective(440px) rotateX(30deg);
        display: flex;

        .bet-box {
          margin: 8px;
          padding: 10px;
          position: relative;
          cursor: pointer;
          border-radius: 4px;
          background: linear-gradient(-180deg, #b0d4bc 1%, #82b594 99%);

          &:hover {
            background: radial-gradient(65% 80%, #fffff0 36%, #e4dbb6 60%, #ded292 76%, #8c631e 99%);
            box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 50%)
          }

          h2 {
            margin: 0;
            font-size: 23px;
          }
        }

        .player-box {
          border: #216bb0 4px solid;
          color: #216bb0;
        }

        .banker-box {
          border: #b80909 4px solid;
          color: #b80909;
        }

        .betBox-Tie {
          border: 4px #709c16 solid;
          color: #709c16;
        }

        .specific-box {
          border: 1px #5e5229 solid;
          color: #5d553b;
        }

        .player-pair {

        }

        .betZone-centrArea {
          .up_set {
            display: flex;
            justify-content: space-evenly;

            p, h2, h3 {
              margin: 0;
            }
          }
          .down_set {
            display: flex;

            p, h2, h3 {
              margin: 0;
            }
          }
        }
      }

      .functionZone {
        position: absolute;
        display: flex;
        bottom: -35px;
        z-index: 20;
        align-items: flex-end;

        .chips {
          width: 550px;
          height: 56px;
          position: relative;
          margin: 12px 0 0 0;
          padding: 0 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          list-style-type: none;

          li {
            width: 67px;
            height: 66px;
            margin-right: 10px;
            cursor: pointer;
            position: relative;
            top: 0px;
            background: none;

            &:hover {
              height: 72px;
              top: -5px;
              transition: all 0.15s linear;

              .shadow {
                display: block;
                top: 45px;
                background: rgba(0, 0, 0, 0.4);
                box-shadow: 0 2px 16px rgb(0 0 0 / 60%);
              }
            }

            &:last-child p {
              line-height: 64px;
            }

            p {
              width: 67px;
              height: 66px;
              text-align: center;
              line-height: 57px;
              font-size: 20px;
              color: #272727;
              position: absolute;
              top: 0px;
              left: 0px;
              z-index: 20;
              background-size: 100% 100%;
            }

            .shadow {
              position: absolute;
              width: 64px;
              height: 50px;
              background: none;
              z-index: 10;
              top: 0px;
              left: calc(50% - 64px/2);
              border-radius: 104px/86px;
              box-shadow: none;
            }

            .ring {
              position: absolute;
              width: 64px;
              height: 52px;
              border: 0px #FFDD00 solid;
              border-radius: 100px/76px;
              bottom: 0px;
              left: calc(50% - 64px/2);
            }
          }

          .chip_10 p {
            background-image: url("../assets/baccarat/caps/chip10.svg")
          }

          .chip_20 p {
            background-image: url("../assets/baccarat/caps/chip20.svg")
          }

          .chip_50 p {
            background-image: url("../assets/baccarat/caps/chip50.svg")
          }

          .chip_100 p {
            background-image: url("../assets/baccarat/caps/chip100.svg")
          }

          .chip_200 p {
            background-image: url("../assets/baccarat/caps/chip200.svg")
          }

          .chip_10k p {
            background-image: url("../assets/baccarat/caps/chip10k.svg")
          }

          .chip_set p {
            background-image: url("../assets/baccarat/caps/chipSet.svg")
          }
        }

        .function-buttons {
          flex: 2;
          height: 57px;
          display: flex;
          align-items: center;

          .confirm-but {
            background: url("../assets/baccarat/icon_confirm.png") 10px center no-repeat, linear-gradient(-180deg, #5C5C5C 0%, #2C2C2C 100%);
          }
        }
      }
    }
    
    
  }
}

</style>