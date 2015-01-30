var methods={
  init:function(){
    methods.initStyling();
    methods.initEvents();
  },
  initStyling:function(){
      repos=_.sortBy(repos,'updated_at').reverse();
      //repos=_.sortBy(activity,'updated_at').reverse();
      methods.renderLeftColumn(users);
      methods.iterateeToFunction(repos,methods.renderRepo);

  },
  initEvents:function(){
    $('.octicon-repo').on('click',methods.toggleRepos);
    $('.octicon-rss').on('click',methods.toggleActivity);
  },
  toggleRepos:function(event){
    event.preventDefault();
    $('section ul:nth-child(2)').empty();
    methods.iterateeToFunction(repos,methods.renderRepo);
  },
  toggleActivity:function(event){
    event.preventDefault();
    $('section ul:nth-child(2)').empty();
    methods.iterateeToFunction(activity,methods.renderActivity);
  },
  renderLeftColumn:function(passed){
    //assemble left column
    var compiled=_.template(templates.leftColumn);
    $("aside").append(compiled(passed));
  },
  renderActivity:function(passedObject){
    if(passedObject.type==='PushEvent'){
      var compiledPush=_.template(templates.activityPush);
      $("section ul:nth-child(2)").append(compiledPush(passedObject));
    }else if(passedObject.payload.ref_type==='branch'){
      var compiledBranch=_.template(templates.activityBranch);
      $("section ul:nth-child(2)").append(compiledBranch(passedObject));
    }else if(passedObject.payload.ref_type==='repository'){
      var compiledRepository=_.template(templates.activityRepository);
      $("section ul:nth-child(2)").append(compiledRepository(passedObject));
    }
  },
  renderRepo:function(passedObject){
    //load template into var
    var compiled=_.template(templates.repos);
    //inut into template var and then prepend to DOM
    $("section ul:nth-child(2)").append(compiled(passedObject));
  },
  iterateeToFunction:function(passedArray,renderFunction){
    _.each(passedArray,renderFunction);
  }
};
$(document).ready(function(){
  methods.init();
});
