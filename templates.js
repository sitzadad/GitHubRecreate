var templateTools={
  //surgery on the incoming date to make it presentable
  getDate:function(date){
    var startDateArray = date.split('-');
    var y=startDateArray[0];
    var m=startDateArray[1];
    var d=startDateArray[2].split('').splice(0,2).join('');

    if(m==1||m==01){
      m='Jan';
    }else if(m==2||m==02){
      m='Feb';
    }else if(m==3||m==03){
      m='Mar';
    }else if(m==4||m==04){
      m='Apr';
    }else if(m==5||m==05){
      m='May';
    }else if(m==6||m==06){
      m='Jun';
    }else if(m==7||m==07){
      m='Jul';
    }else if(m==8||m==08){
      m='Aug';
    }else if(m==9||m==09){
      m='Sep';
    }else if(m==10){
      m='Oct';
    }else if(m==11){
      m='Nov';
    }else if(m==12){
      m='Dec';
    }
    return m+" "+d+", "+y;
  },
  //returns a string containing the elapsed time since the repo was updated
  timeSinceUpdate:function(updateTime){
    var nowDT = new Date();
    var nowHours = nowDT.getHours();
    var nowMinutes = nowDT.getMinutes();
    var nowSeconds = nowDT.getSeconds();
    var updateTime = updateTime.split('');
    var thenHours = updateTime.splice(11,2);
    var thenMinutes = updateTime.splice(14,2);
    var thenSeconds = updateTime.splice(18,2);

    //2015-01-15T03:58:20Z
    return thenHours+" hours, "+thenMinutes+" minutes";
  },
  formatPayloadRef:function(passed){
    var foo=passed.split('/');
    return(foo.splice(2));

  },
  findFirstSeven:function(passed){
    //var foo = passed;
    return(passed.split('').splice(0,7).join(''));
  }
};
var templates={};
  templates.repos=[
    '<li>',
    '<h3><%= name %></h3>',
    '<span class="octicon octicon-git-branch repoTextRight">&nbsp;<%= forks %>&nbsp;</span>',
    '<span class="octicon octicon-star repoTextRight">&nbsp;<%= stargazers_count %>&nbsp;</span>',
    '<span class="repoTextRight repoLang">&nbsp;<%= language %>&nbsp;</span>',
    '<span class="repoTime">Updated&nbsp;<%= updated_at %></span>',
    '</li>'
  ].join('');
  templates.leftColumn=[
  '<img src=<%= avatar_url %>/>',
  '<p>',
  '<span id="name"><%= name %></span>',
  '<span id="login"><%= login %></span>',
  '</p>',
  '<p>',
  '<span id="leftLocationWrap"><span class="octicon octicon-location"></span><span class="locationDateLeft">&nbsp;&nbsp;<%= location %></span></span>',
  '<span><span class="octicon octicon-clock"></span><span class="locationDateLeft">&nbsp;Joined on <%= templateTools.getDate(created_at) %></span></span>',
  '</p>',
  '<p id="statsWrapper">',
  '<span class="statsChunk"><span><%= followers %></span><span>Followers</span></span>',
  '<span class="statsChunk"><span>0</span><span>Starred</span></span>',
  '<span class="statsChunk"><span><%= following %></span><span>Following</span></span>',
  '</p>',
  '<p id="orgP">',
  '<span>Organizations</span>',
  '<img src="https://avatars2.githubusercontent.com/u/10147338?v=3&s=200" class="jsLogo"/>',
  '</p>'
  ].join('');
  templates.activityPush=[
    '<li class="pushActivity">',
      '<span><%= created_at %></span>',
      '<div class="activityLineTwo">',
        '<span><%= actor.login %> </span>',
        '<span>&nbsp;pushed to&nbsp;</span>',
        '<span><%= templateTools.formatPayloadRef(payload.ref) %></span>',
        '<span>&nbsp;at&nbsp;</span>',
        '<span><%= repo.name %></span>',
      '</div>',
      '<div class="activityLineThree">',
        '<img src=<%= actor.avatar_url %></img>',
        '<span>&nbsp;<%= templateTools.findFirstSeven(payload.commits[0].sha) %><span>&nbsp;<%= payload.commits[0].message %></span></span>',
      '</div>',
    '</li>'
  ].join('');
  templates.activityBranch=[
  '<li class="branchActivity">',
    '<span><%= actor.login %>',
      '<span>&nbsp;created branch',
        '<span class="octicon octicon-git-branch ">&nbsp;<%= payload.ref %></span>',
      '&nbsp;at&nbsp;',
      '</span>',
      '<%= repo.name %> <span> <%= created_at %></span>',
    '</span>',
  '</li>'
  ].join('');
  templates.activityRepository=[
  '<li class="RepoActivity">',
    '<span><%= actor.login %>',
      '<span>&nbsp;created repository&nbsp;</span>',
      '<%= repo.name %>',
      '<span>&nbsp;<%= created_at %></span>',
    '</span>',
  '</li>'
  ].join('');
