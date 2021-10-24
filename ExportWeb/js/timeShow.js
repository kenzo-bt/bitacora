const showTime = () => {
  // Kanji + text
  setTimeout(function(){
    showElem('kanjiBig');
    showElem('genSub');
  }, 100);
  // Profile + text
  setTimeout(function(){
    showElem('profileImg');
    showElem('profileTitleDouble');
  }, 1000);
  // Content
  setTimeout(function(){
    showElem('contentWrapper');
  }, 2000);
}

const showElem = id => {
  document.getElementById(id).style.opacity = 1;
}
