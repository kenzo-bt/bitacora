const showTime = () => {
  // Kanji + text
  setTimeout(function(){
    showElem('kanjiBig');
    showElem('genSub');
  }, 1000);
  // Profile + text
  setTimeout(function(){
    showElem('profileImg');
    showElem('profileTitleDouble');
  }, 2000);
  // Content
  setTimeout(function(){
    showElem('contentWrapper');
  }, 3000);
}

const showElem = id => {
  document.getElementById(id).style.opacity = 1;
}
