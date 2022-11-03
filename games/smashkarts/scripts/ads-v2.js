'use strict';

const divIdMainMenuBanner = "adContainer";
const divIdMainMenuBanner2 = "adContainerMainMenu";
const divIdWinCeremonyBanner = "adContainer2";
const divIdWinCeremonyBanner2 = "adContainerWin";
const divIdLongBanner = "adLongContainer";
const divIdLongBanner2 = "adLongContainer2";

function hideBannerElement(adElementId)
{
  const ad = document.querySelector(`#${adElementId}`);
  if(ad != null) ad.style.display = "none";
}

function showBannerElement(adElementId, displayStyle = "block")
{
  const ad = document.querySelector(`#${adElementId}`);

  if(ad != null)
  {
    ad.style.position = "absolute";
    ad.style.display = displayStyle;
  }
}

var gameContainer;
function updateAdSizes()
{
  if(gameContainer == null)
  {
    gameContainer = document.getElementById('gameContainer');
  }

  if(gameContainer != null)
  {
    updateMainMenuBanner();
    updateLongBanner();
    updateWinBanner();
  }
}

var mainMenuBanner;
const defaultMainMenuScaleStr = "scale(100%, 100%)";
const defaultMainMenuTranslateStr = "translate(0px, -50%)";
function updateMainMenuBanner()
{
  if(mainMenuBanner == null)
  {
    mainMenuBanner = document.getElementById(divIdMainMenuBanner);
  }

  if(mainMenuBanner != null && mainMenuBanner.style.display !== "none")
  {
    var adContainerW = mainMenuBanner.offsetWidth;
    var adContainerH = mainMenuBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(adContainerH/gameContainerH > 0.75)
    {
      var newHeight = gameContainerH * 0.75;
      var newScale = newHeight / adContainerH;
      var scaleString = "scale( " + newScale + "," + newScale + ")";
      mainMenuBanner.style.transform = `${scaleString} ${defaultMainMenuTranslateStr}`;
    }
    else
    {
      mainMenuBanner.style.transform =  `${defaultMainMenuScaleStr} ${defaultMainMenuTranslateStr}`
    }
  }
}

var winBanner;
const defaultWinCeremonyScaleStr = "scale(100%, 100%)";
const defaultWinCeremonyTranslateStr = "translate(0px, -50%)";
function updateWinBanner()
{
  if(winBanner == null)
  {
    winBanner = document.getElementById(divIdWinCeremonyBanner);
  }

  if(winBanner != null && winBanner.style.display !== "none")
  {
    var adContainerW = winBanner.offsetWidth;
    var adContainerH = winBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(adContainerH/gameContainerH > 0.75)
    {
      var newHeight = gameContainerH * 0.75;
      var newScale = newHeight / adContainerH;
      var scaleString = "scale( " + newScale + "," + newScale + ")";
      winBanner.style.transform = `${scaleString} ${defaultWinCeremonyTranslateStr}`;
    }
    else
    {
      winBanner.style.transform =  `${defaultWinCeremonyScaleStr} ${defaultWinCeremonyTranslateStr}`
    }
  }
}

var longBanner;
function updateLongBanner()
{
  if(longBanner == null)
  {
    longBanner = document.getElementById(divIdLongBanner);
  }

  if(longBanner != null && longBanner.style.display !== "none")
  {
    longBanner.style.bottom = 0 + "px";
    //longBanner.style.width = 100 + "vw";
    longBanner.style.width = gameContainer.offsetWidth + "px";

    var adContainerH = longBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(isMobile())
    {
      longBanner.style.top = (gameContainerH - adContainerH) + "px";
      longBanner.style.transform =  "scale( 1, 1) translate(0px, -10px)";
    }
    else
    {
      if(adContainerH/gameContainerH > 0.3)
      {
        var newHeight = gameContainerH * 0.3;
        var newScale = newHeight / adContainerH;
        var scaleString = "scale( " + newScale + "," + newScale + ")";
        var offsetX = 0;
        var offsetY = (adContainerH - adContainerH*newScale)/2 - 10;
        var translateString = "translate(" + offsetX + "px, " + offsetY + "px)";
        longBanner.style.transform = translateString + " " + scaleString;
      }
      else
      {
        longBanner.style.transform =  "scale( 1, 1) translate(0px, -10px)";
      }
    }
  }
}

// window.onresize = onWindowResize;
// function onWindowResize()
// {
//   updateAdSizes();
// }
setInterval(updateAdSizes, 500);

function showMainMenuBanner()
{
  hideWinCeremonyBanner();
  hideLongBanner();

  showBannerElement(divIdMainMenuBanner);

  updateAdSizes();

  requestMainMenuBanner();
}

function hideMainMenuBanner()
{
  hideBannerElement(divIdMainMenuBanner);
  hideBannerElement(divIdMainMenuBanner2);
  hideMainMenuChildBanner();
}

function showWinCeremonyBanner(interstialRequested)
{
  hideLongBanner();
  hideMainMenuBanner();

  showBannerElement(divIdWinCeremonyBanner);

  updateAdSizes();

  requestWinCeremonyBanner(interstialRequested);
}


function hideWinCeremonyBanner()
{
  hideBannerElement(divIdWinCeremonyBanner);
  hideBannerElement(divIdWinCeremonyBanner2);
  hideWinCeremonyChildBanner();
}

function showLongBanner()
{
  hideWinCeremonyBanner();
  hideMainMenuBanner();

  showBannerElement(divIdLongBanner, "flex");

  updateAdSizes();

  requestLongBanner();
}


function hideLongBanner()
{
  hideBannerElement(divIdLongBanner);
  hideBannerElement(divIdLongBanner2);
  hideLongChildBanner();
}

function showLongBanner2()
{
  hideWinCeremonyBanner();
  hideMainMenuBanner();

  showBannerElement(divIdLongBanner2)

  requestLongBanner2();
}

function showMainMenuBanner2()
{
  hideWinCeremonyBanner();
  hideLongBanner();

  showBannerElement(divIdMainMenuBanner2)

  requestMainMenuBanner2();
}

function showWinCeremonyBanner2(interstialRequested)
{
  hideLongBanner();
  hideMainMenuBanner();

  showBannerElement(divIdWinCeremonyBanner2)

  requestWinCeremonyBanner2(interstialRequested);
}

function showPreGameInterstitial(audioOn)
{
  showInterstitial(audioOn, 'start', 'pregame');
}

function showWinCeremonyInterstitial(audioOn)
{
  showInterstitial(audioOn, 'next', 'winceremony')
}

function interstitialStart()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialStart");
}

function interstitialError()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialFailed");
}

function interstitialSkipped()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialSkipped");
}

function interstitialComplete()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialComplete");
}

