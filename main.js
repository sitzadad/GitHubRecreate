var methods={
  init:function(){
    methods.initStyling();
  },
  initStyling:function(){
    methods.formatLeft();
    methods.renderAllRepos(repos);
  },
  formatLeft:function(){
    //performing surgery on the incoming date to make it presentable
    var startDateArray=user.created_at.split('-');
    var y=startDateArray[0];
    var m=startDateArray[1];
    var d=startDateArray[2].split('').splice(0,2).join('');
    //assemble left column
    var leftContents=[
      '<img src='+user.avatar_url+'/>',
      '<p><span>'+user.name+'</span>',
      '<span>'+user.login+'</span></p>',
      '<p><span class="octicon octicon-location"> '+user.location+'</span>',
      '<span class="octicon octicon-clock">Joined on '+m+'/'+d+'/'+y+'</span></p>',
      '<div id="statsWrapper"><div><span>'+user.followers+'</span><span>Followers</span></div>',
      '<div><span>0</span><span>Starred</span></div>',
      '<div><span>'+user.following+'</span><span>Following</span></div></div>',
      '<p>Organizations</p>'
    ].join('')
    $("aside").append(leftContents);
  },
  formatRight:function(){

  },
  renderRepo:function(myObject){
    var compiled=_.template(templates.repos);
    //add completed template to DOM
    $("section ul").prepend(compiled(myObject));
  },
  renderAllRepos:function(myArray){
    _.each(myArray,methods.renderRepo);
  }
};

$(document).ready(function(){
  methods.init();
});
