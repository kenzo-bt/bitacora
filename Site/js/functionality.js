let sliderPosition = undefined;
let bodySlider = undefined;
let arrows = undefined;
let imagePath = undefined;

function moveSlide(dir){
  hideArrows();
  setTimeout(function(){
    showArrows();
  }, 4500);
  /*alert(`Move slide to the ${dir}`);*/
  if(dir == 'left' && (sliderPosition > 0)){
    sliderPosition--;
    bodySlider.style.transform = `translateX(${-100 * sliderPosition}vw)`;
  }
  else if(dir == 'right' && (sliderPosition < 3)){
    sliderPosition++;
    bodySlider.style.transform = `translateX(${-100 * sliderPosition}vw)`;
  }
  else{
    /*alert(`Error: Position -> ${sliderPosition}`);*/
  }
}

function hideArrows(){
  for(arrow of arrows){
    arrow.style.opacity = "0";
  }
}

function showArrows(){
  for(arrow of arrows){
    arrow.style.opacity = "0.3";
  }
}

function pageInit(align){
  setVariables();
  generateSlides();
  if(align){
    sliderPosition = align;
    bodySlider.style.transform = `translateX(${-100 * sliderPosition}vw)`;
  }
  setSlideContent();
  setTimeout(function(){
    showArrows();
  }, 2000);
}

function setVariables(){
  sliderPosition = 0;
  bodySlider = document.getElementById('sliderWrapper');
  arrows = document.getElementsByClassName('slideArrow');
  imgPath = '../img/';
}

function generateSlides(){
  let colors = ['blue', 'red', 'green', 'black'];
  let hideLeft = "";
  let hideRight = "";
  let backgroundSrc = `url('${imgPath}backTexturedPaperEdit.jpg')`;
  for(let i = 0; i < colors.length; i++){
    if(i == 0){
      hideLeft = "style='visibility: hidden'";
    }
    else{
      hideLeft = "";
    }
    if(i == (colors.length - 1)){
      hideRight = "style='visibility: hidden'";
    }
    else{
      hideRight = ""
    }
    bodySlider.innerHTML += `<div class="bodySlide" style="background-image: ${backgroundSrc}">
      <div class="slideArrow" ${hideLeft}>
        <a href="#" onclick="moveSlide('left')">
          <img src="${imgPath}arrow.png" alt="navigationArrow" style="transform: rotate(180deg)">
        </a>
      </div>
      <div class="slideContent"></div>
      <div class="slideArrow" ${hideRight}>
        <a href="#" onclick="moveSlide('right')">
          <img src="${imgPath}arrow.png" alt="navigationArrow">
        </a>
      </div>
    </div>`;
  }
}

function setSlideContent(){
  let slides = document.getElementsByClassName('slideContent');
  // Separate slides
  let titlePage = slides[0];
  let introPage = slides[1];
  let firstGen = slides[2];
  let secondGen = slides[3];
  // Set content
  //// TitleSlide
  let title = 'Los Shironoshita Shirazawa';
  let subtitle = 'Una historia de inmigración japonesa al Perú';
  let logoSrc = `${imgPath}kanjiBlack.png`;
  let titleContent = `
    <div class='titleContent'>
      <div class='titleImage'>
        <img src='${logoSrc}' alt='ProjectLogo'>
      </div>
      <div class='titleText'>
        <div class='titleTextTop'>
          ${title}
        </div>
        <div class='titleTextBottom'>
          ${subtitle}
        </div>
      </div>
    </div>
    `;
  titlePage.innerHTML = titleContent;
  //// IntroSlide
  let introText = `
    Este es el lugar de las memorias de los descendientes de dos inmigrantes japoneses al Perú: Kesakichi Shironoshita y Fumi Shirazawa.
    <br><br>Estas páginas pretenden hacer un recuento perfectamente imperfecto de sus vidas y la de sus descendientes.
    <br><br>Perfecto porque nos ayuda a todos saber de donde  y de quienes venimos. Perfecto porque puede aportar un granito de arena a la investigación sobre la historia del éxodo del cual ellos formaban parte.
    <br><br>Imperfecto, porque es imposible rememorar cada instante. Imperfecto porque escogemos lo que queremos contar. Imperfecto porque quedan tantos misterios e incógnitas imposibles de desvelar, o que se van desvelando con el correr del tiempo.
    <br><br>Para la familia, amigos, y curiosos.
    <br><br>NOTA:
    <br><br>La información provista en este documento viene de conversaciones con diferentes miembros  de la familia y documentos históricos como kosekis, pasaportes, fichas de investigación creadas  por Verónica Cock creo y otros. Además, solo pretende dar una idea general de la evolución de  la familia en los aproximadamente 100 años que cubren muy someramente estas narraciones.
  `;
  let introSlide = `
    <div class='introContent'>
      ${introText}
    </div>
    `;
  introPage.innerHTML = introSlide;
  //// First gen slide
  let genSlide = `
    <div class="generationContent">
      ${generationLeft(1)}
      <div class="generationRight">
      ${insertRow(
        [
          createDoubleItem(
            createSingleItem(`${imgPath}kesakichi-head.jpg`, 'Kesakichi Shironoshita', '1891 - 1966'),
            createSingleItem(`${imgPath}fumi-head.jpg`, 'Fumi Shirazawa', '1895 - 1965'),
            './kesakichi-fumi.html'
          )
        ]
      )}
      </div>
    </div>
    `;
  firstGen.innerHTML = genSlide;
  //// Second gen slide
  let genSlide2 = `
    <div class="generationContent">
      ${generationLeft(2)}
      <div class="generationRight">
      ${insertRow(
        [
          createSingle(`${imgPath}/2/alejaFace.png`, 'Alejandrina Shironoshita Shirazawa', '1919 - 2015', './alejaToyoko.html'),
          createSingle(`${imgPath}/3/elisaFace.png`, 'Elisa Shironoshita Shirazawa', '1925 - 2016', './elisaTsuruko.html')
        ]
      )}
      ${insertRow(
        [
          createSingle(`${imgPath}/4/zoilaFace.png`, 'Zoila Shironoshita Shirazawa', '1927 - Presente', './zoilaKazuko.html'),
          createSingle(`${imgPath}/5/victoriaFace.png`, 'Victoria Shironoshita Shirazawa', '1929 - 2015', './victoriaHiruko.html')
        ]
      )}
      ${insertRow(
        [
          createSingle(`${imgPath}/6/emilioFace.png`, 'Emilio Shironoshita Shirazawa', '1931 - 2010', './emilioMoritoshi.html'),
          createSingle(`${imgPath}/7/luciaFace.png`, 'Lucia Shironoshita Shirazawa', '1936 - Presente', './luciaSueko.html')
        ]
      )}
      </div>
    </div>
    `;
  secondGen.innerHTML = genSlide2;
}

function generationLeft(num){
  if(arguments.length != 1){
    alert(`generationLeft() called with wrong amount of arguments!\nReceived: ${arguments.length}`);
  }
  else{
    if(typeof num != typeof 1){
      alert(`generationLeft() expected a numerical argument!'\nReceived ${typeof num}`);
    }
    else{
      let kanji, text;
      switch(num) {
        case 1:
          kanji = '一世';
          text = 'Issei';
          break;
        case 2:
          kanji = '二世';
          text = 'Nisei';
          break;
        default:
          kanji = '?';
          text = 'Error';
      }
      let block = `<div class='generationLeft'>
          <p class='kanjiBig'>${kanji}</p>
          <p style='margin-top: 30px; font-size: 30px; font-weight: thin;'>${text}</p>
        </div>`;
      return block;
    }
  }
}

function createSingleItem(img, name, date)
{
  return `<div class="singleItem">
            <div class="roundImageContainer">
              <img class="roundImage" src="${img}">
            </div>
            <div class="itemName">${name}</div>
            <div class="itemDate">${date}</div>
          </div>`;
}

function createDoubleItem(item1, item2, url)
{
  return `<a class="doubleItem" href=${url}>
            ${item1}
            ${item2}
          </a>`;
}

function createSingle(img, name, date, url)
{
  return `<a class="single" href=${url}>
            <div class="roundImageContainer">
              <img class="roundImage" src="${img}">
            </div>
            <div class="itemName">${name}</div>
            <div class="itemDate">${date}</div>
          </a>`;
}

function insertRow(items)
{
  let allItems = ``;
  for(let i = 0; i < items.length; i++)
  {
    allItems += items[i];
  }
  return `<div class='peopleRow'>${allItems}</div>`;
}
