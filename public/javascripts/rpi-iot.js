function capture() {
  $.ajax({
    url: '/camera/capture',
    dataType: 'json',
    async: false,
    success: function (data) {
      $('#photo').attr("src",data.url);
      t = '<img name="p2" src="' + data.url + '" width="100PX" style="margin:1px;cursor:pointer" onclick="$(\'#photo\').attr(\'src\',this.src)"/>'
      $('#photo2').append(t);
      savePhoto(t);
    },
    fail: function () { $('#photo').html('<img src="/images/webcam.png" width="80%"  style="margin-top:20px;cursor:pointer" onclick="capture()"/>'); }
  })

}

function savePhoto(photo) {
  localStorage.setItem('photos', (localStorage.getItem('photos') ? localStorage.getItem('photos') : '') + photo);
}

function loadPhotos() {
  $('#photo2').html(localStorage.getItem('photos') ? localStorage.getItem('photos') : '');
}

function clearPhotos() {
  localStorage.setItem('photos', ''); $('#photo2').html('');
}

function playPhotos()
{
  for(var i=0;i< $("img[name='p2']").length;i++)
  {
    setTimeout(setPhoto,500+i*500,i);
  }

  function setPhoto(i)
  {
    $('#photo').attr("src",$("img[name='p2']")[i].src);
  }

}



function AddFooter() {
  $('#footer').html(
    '<div class="navbar-inverse navbar-fixed-bottom text-center">' +
    '<small>' +

    '<font color="silver">2018 Powered by Tony.J.Wang </font></small>' +
    '&nbsp<a href="http://nesc.newegg.com.cn" target="_blank">NESC</a>' +
    '</div>'
  );
}

function AddTopmenu() {

  icon = '/images/favicon.png';
  menutitle = document.title;

  topmenu =
    '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
    '<div class="container-fluid">' +
    '<div class="navbar-header">' +
    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
    '<span class="sr-only">Toggle navigation</span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '</button>' +
    '<a class="navbar-brand" href="index.html"><img src="' + icon + '"> &nbsp;' + menutitle + '</a>' +
    '</div>' +
    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
    '<ul class="nav navbar-nav">' +
    '<li id="statusmenu"><a id="statuslink" href="#">客厅</a></li>' +
    '<li id="statisticsmenu"><a id="statisticslink" href="#">卧室</a></li>' +
    '<li id="statisticsmenu"><a id="addonslink" href="#">厨房</a></li>' +

    '<li class="dropdown">' +

    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">办公室<span class="caret"></span></a>' +
    '<ul class="dropdown-menu" role="menu">' +
    '<li class="dropdown-header"> <b>五楼办公区</b></li>' +
    '<li><a href="#" >#1会议室</a></li>' +
    '<li><a href="#" >#4会议室</a></li>' +
    '<li class="divider"></li>' +
    '<li class="dropdown-header"> <b>六楼办公区</b></li>' +
    '<li><a href="#">#8会议室</a></li>' +
    '<li><a href="#">照明系统</a></li>' +
    '</ul>' +
    '</li>' +
    '</ul>' +
    '<div class="pull-right hide" id="divfriends">' +
    '<ul class="nav navbar-nav">' +
    '<li class="dropdown">' +
    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Friends <b class="caret"></b></a>' +
    '<ul class="dropdown-menu dropdown-menu-right" id="friends">' +
    '</ul>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div><!-- /.navbar-collapse -->' +
    '</div><!-- /.container-fluid -->' +
    '</nav>'
  $('#topmenu').html(topmenu);
}

function getVersion() {
  $.ajax({
    url: 'version.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      localStorage.setItem('version', data.version);
    }
  })
}

$(function () {

  if (localStorage == null) {
    alert("TypeError: localStorage is null\n\n" +
      "Activate HTML5 localStorage before continuing."
    );
  }

  // Construct the page template
  //getVersion();
  AddTopmenu();
  //AddDialogs();
  AddFooter();
  //UpdateMenu();

    loadPhotos();

});
