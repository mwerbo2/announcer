(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{216:function(e,t,n){},358:function(e,t,n){e.exports=n(682)},366:function(e,t,n){},682:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(25),i=n.n(c),l=n(698),r=(n(216),n(59)),s=n.n(r),u=n(91),d=n(15),m=n(16),h=n(21),p=n(19),g=n(20),f=n(684),b=n(697),y=n(709),k=n(693),E=n(705),v=(n(366),{color:"#ffffff"}),O=function(e){return o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:16},o.a.createElement(k.a,{style:v,fluid:!0},o.a.createElement("div",{name:"title",className:"title",dangerouslySetInnerHTML:{__html:e.title}}),o.a.createElement("div",{name:"body",style:{color:"#ffffff"},className:"body",dangerouslySetInnerHTML:{__html:e.body}})))))},j=n(707),S=n(313),C=n.n(S),w=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={date:C()().format("MMMM D, YYYY"),time:C()().format("h:mm A")},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timeInterval=setInterval(function(){e.setState({dateTime:C()().format("LLLL")})},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timeInterval)}},{key:"render",value:function(){return o.a.createElement(k.a,null,o.a.createElement("p",{style:{color:"white",fontSize:"17px",margin:"0",textAlign:"center"}},this.state.date),o.a.createElement("p",{style:{color:"white",fontSize:"17px",textAlign:"center"}},this.state.time))}}]),t}(o.a.Component),A=n(27),I=n.n(A),x=(n(450),function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={currentWeather:"",conditions:"fair",temp:"",temp_max:"",temp_min:"",iconName:"",iconImage:""},n.darkSkyIcons=["clear-day","clear-night","rain","snow","sleet","wind","fog","cloudy","partly-cloudy-day","partly-cloudy-night"],n.iconSelector=function(){switch(n.state.icon){case"clear-day":n.setState({iconImage:"wi-day-sunny"});break;case"clear-night":n.setState({iconImage:"wi-night-clear"});break;case"rain":n.setState({iconImage:"wi-rain"});break;case"snow":n.setState({iconImage:"wi-snow"});break;case"sleet":n.setState({iconImage:"wi-sleet"});break;case"wind":n.setState({iconImage:"wi-strong-wind"});break;case"fog":n.setState({iconImage:"wi-fog"});break;case"cloudy":n.setState({iconImage:"wi-cloudy"});break;case"partly-cloudy-day":n.setState({iconImage:"wi-day-cloudy"});break;case"partly-cloudy-night":n.setState({iconImage:"wi-night-partly-cloudy"});break;default:n.setState({iconImage:"wi-day-cloudy"})}},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;I.a.get("/weather").then(function(t){e.setState({temp:t.data.temperature,icon:t.data.icon}),e.iconSelector()}).catch(function(e){console.log(e)}),this.timeInterval=setInterval(function(){I.a.get("/weather").then(function(t){e.setState({temp:t.data.temperature,icon:t.data.icon}),e.iconSelector()}).catch(function(e){console.log(e)})},36e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timeInterval)}},{key:"render",value:function(){return o.a.createElement(k.a,{textAlign:"center",style:{marginTop:"1em"}},o.a.createElement("span",{style:{fontSize:"3em",color:"white"}},o.a.createElement("i",{className:"wi ".concat(this.state.iconImage)})),o.a.createElement("p",{style:{color:"white",fontSize:"18px"}},Math.round(this.state.temp),"\xb0F"))}}]),t}(o.a.Component)),_=function(){return o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:4},o.a.createElement(x,null)),o.a.createElement(E.a.Column,{width:8},o.a.createElement(j.a,{textAlign:"center",as:"h1",inverted:!0,style:{fontSize:"45px",fontWeight:"200"}},"Announcements")),o.a.createElement(E.a.Column,{width:4},o.a.createElement(w,null)))},T=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={fullAnnouncement:[],title:"",body:"",backgroundImage:"",opacity:".5"},n.componentDidUpdate=function(e){n.props.opacity!==e.opacity&&(console.log("props lvie",n.props,"****",n.prevProps),n.setState({opacity:n.props.opacity}),console.log("state live",n.state.opacity))},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("mounted",this.props),I.a.get("/announcements/liveStatus").then(function(t){e.setState({fullAnnouncement:t.data,title:t.title,body:t.body})}),I.a.get("/boards").then(function(t){e.setState({backgroundImage:t.data[0].background_image})}),setInterval(function(){I.a.get("/announcements/liveStatus").then(function(t){e.setState({fullAnnouncement:t.data,title:t.title,body:t.body})}).catch(function(e){return console.log(e)})},5e3)}},{key:"render",value:function(){var e={backgroundImage:"url(".concat(this.state.backgroundImage,")"),backgroundPosition:"center",height:"100%",width:"100%",position:"fixed"};return o.a.createElement("div",{className:"backgroundImageContainer",style:e},o.a.createElement(k.a,{className:"liveDisplay",fluid:!0,key:this.props.key,style:{background:"rgb(0,0,0,".concat(this.state.opacity,")")}},o.a.createElement(E.a,{className:"widescreen"},o.a.createElement(_,null),o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:16},this.state.fullAnnouncement.map(function(e){return o.a.createElement(O,{key:e.id,title:e.announcement_title,body:e.announcement_body})}))))))}}]),t}(o.a.Component),M=Object(y.a)(T),D=n(324),R=new(function(){function e(){Object(d.a)(this,e),this.auth0=new D.a.WebAuth({domain:"".concat("announce.auth0.com"),audience:"https://".concat("announce.auth0.com","/userinfo"),clientID:"".concat("R12SHX1EQGSf4r0SvgaxHtevY6gjbjb0"),redirectUri:"http://docker01/callback",responseType:"id_token",scope:"openid profile",sso:!1}),this.getProfile=this.getProfile.bind(this),this.handleAuthentication=this.handleAuthentication.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.signIn=this.signIn.bind(this),this.signOut=this.signOut.bind(this),this.renewSession=this.renewSession.bind(this),this.setSession=this.setSession.bind(this)}return Object(m.a)(e,[{key:"getProfile",value:function(){return this.profile}},{key:"getIdToken",value:function(){return this.idToken}},{key:"isAuthenticated",value:function(){return(new Date).getTime()<this.expiresAt}},{key:"signIn",value:function(){this.auth0.authorize()}},{key:"handleAuthentication",value:function(){var e=this;return new Promise(function(t,n){e.auth0.parseHash(function(a,o){return a?n(a):o&&o.idToken?(e.setSession(o),void t()):n(a)})})}},{key:"setSession",value:function(e){localStorage.setItem("isLoggedIn","true"),this.acccessToke=e.accessToken,this.idToken=e.idToken,this.profile=e.idTokenPayload,this.expiresAt=1e3*e.idTokenPayload.exp}},{key:"signOut",value:function(){this.acccessToken=null,this.idToken=null,this.expiresAt=0,localStorage.removeItem("isLoggedIn"),this.auth0.logout({returnTo:"http://docker01/",clientID:"".concat("R12SHX1EQGSf4r0SvgaxHtevY6gjbjb0")})}},{key:"renewSession",value:function(){var e=this;this.auth0.checkSession({},function(t,n){n&&n.accessToken&&n.idToken?e.setSession(n):t&&(e.logout(),console.log(t),alert("Could not get a new token (".concat(t.error,": ").concat(t.error_description,").")))})}},{key:"silentAuth",value:function(){var e=this;return new Promise(function(t,n){e.auth0.checkSession({},function(a,o){if(a)return n(a);e.setSession(o),t()})})}}]),e}()),B=n(702),z=n(683),P=n(695),H=Object(y.a)(function(e){return o.a.createElement(B.a,{inverted:!0,fixed:"top"},o.a.createElement(k.a,null,o.a.createElement(B.a.Item,{position:"left",as:P.a,to:"/",header:!0},o.a.createElement(z.a,{size:"mini",src:"/vector-megaphone-man-shouting-8.png",style:{marginRight:"1.5em"}}),"Announce"),o.a.createElement(B.a.Item,{as:P.a,to:"/display",target:"_blank"},"View Live"),!R.isAuthenticated()&&o.a.createElement(B.a.Item,{onClick:R.signIn},"Profile"),R.isAuthenticated()&&o.a.createElement(B.a.Item,{as:P.a,to:"/profile"},"Profile"),!R.isAuthenticated()&&o.a.createElement(B.a.Item,{onClick:R.signIn},"Log in"),R.isAuthenticated()&&o.a.createElement(B.a.Item,{as:"a",onClick:function(){R.signOut(),e.history.replace("/")}},"Log out")))}),L=n(706),N=function(){return o.a.createElement(L.a,{inverted:!0,vertical:!0},o.a.createElement(k.a,{textAlign:"center"},o.a.createElement(z.a,{centered:!0,size:"mini",src:"/vector-megaphone-man-shouting-8.png"})))},U=n(22),F=n(694),V=n(310),q=n(699),W=n(97),Y=n(704),K=n(327),G=n(312),J=(n(493),function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).handleChange=function(e){n.setState({startTime:e})},n.deleteSchedule=function(){I.a.delete("/announcements/".concat(n.props.post_id)).catch(function(e){return console.log(e)}).then(function(){return n.setState({scheduleDeleted:!0})})},n.checkSchedule=function(){},n.handleSubmit=function(e){n.checkSchedule(),e.preventDefault();var t=n.props.post_id;n.state.currentSchedule.length>0?I.a.put("/schedules/".concat(t),{date_time_start:n.state.startTime,date_time_end:n.state.endTime},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){return n.closeModal(e)}).catch(function(e){return console.log(e)}):I.a.post("/schedules",{date_time_start:n.state.startTime,date_time_end:n.state.endTime,AnnouncementId:t},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){return n.closeModal(e)}).catch(function(e){return console.log(e)})},n.handleStartTime=function(e){n.setState({startTime:e.target.value})},n.handleStartDate=function(e){n.setState({startTime:e})},n.handleEndDate=function(e){n.setState({endTime:e})},n.handleEndTime=function(e){n.setState({endTime:e.target.value})},n.handleSubmit=n.handleSubmit.bind(Object(U.a)(Object(U.a)(n))),n.handleStartTime=n.handleStartTime.bind(Object(U.a)(Object(U.a)(n))),n.handleEndTime=n.handleEndTime.bind(Object(U.a)(Object(U.a)(n))),n.state={startTime:new Date,endTime:new Date,currentSchedule:[],postMessage:"",scheduleDeleted:!1},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"closeModal",value:function(e){this.setState({postMessage:e.statusText}),this.props.closeMod()}},{key:"componentDidMount",value:function(){var e=this;I.a.get("/schedules/".concat(this.props.post_id)).catch(function(e){return console.log(e)}).then(function(t){return e.setState({currentSchedule:t.data})})}},{key:"render",value:function(){return 0===this.state.currentSchedule.length?o.a.createElement("div",null,o.a.createElement("div",{className:this.props.classes.flexcontainer},o.a.createElement("form",{className:this.props.container,noValidate:!0,onSubmit:this.handleSubmit},o.a.createElement(E.a,{centered:!0,textAlign:"center",columns:3},o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,null,o.a.createElement(j.a,{as:"h5"},"Date Start"),o.a.createElement(G.a,{selected:this.state.startTime,onChange:this.handleStartDate,dateFormat:"yyyy-MM-dd",key:1})),o.a.createElement(E.a.Column,null,o.a.createElement(j.a,{as:"h5"},"Date End"),o.a.createElement(G.a,{selected:this.state.endTime,onChange:this.handleEndDate,dateFormat:"yyyy-MM-dd",minDate:new Date,key:2})),o.a.createElement(E.a.Column,null,o.a.createElement(Y.a,{type:"submit",positive:!0,style:{position:"absolute",right:0,bottom:0}},"Save"))))),o.a.createElement(j.a,{as:"h3"},this.state.postMessage)),o.a.createElement(j.a,{as:"h2"},o.a.createElement(V.a,{name:"calendar"}),o.a.createElement(j.a.Content,null,"No Schedules"))):o.a.createElement("div",null,o.a.createElement("div",{className:this.props.classes.flexcontainer},o.a.createElement("form",{className:this.props.container,noValidate:!0,onSubmit:this.handleSubmit},o.a.createElement(E.a,{centered:!0,textAlign:"center",columns:3},o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,null,o.a.createElement(j.a,{as:"h5"},"Date Start"),o.a.createElement(G.a,{selected:this.state.startTime,onChange:this.handleStartDate,dateFormat:"yyyy-MM-dd"})),o.a.createElement(E.a.Column,null,o.a.createElement(j.a,{as:"h5"},"Date End"),o.a.createElement(G.a,{selected:this.state.endTime,onChange:this.handleEndDate,dateFormat:"yyyy-MM-dd",minDate:new Date})),o.a.createElement(E.a.Column,null,o.a.createElement(Y.a,{type:"submit",positive:!0},"Save"))))),o.a.createElement(j.a,{as:"h3"},this.state.postMessage)),o.a.createElement(j.a,{as:"h3"}," ",o.a.createElement(V.a,{name:"calendar check outline"}),"Current schedule"),this.state.currentSchedule.map(function(e){return o.a.createElement(E.a,{columns:2,key:e.id},o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:3},o.a.createElement(j.a,{as:"h4"},"Date start"),o.a.createElement(j.a,{as:"h4"},e.date_time_start)),o.a.createElement(E.a.Column,{width:3},o.a.createElement(j.a,{as:"h4"}," Date end"),o.a.createElement(j.a,{as:"h4"},e.date_time_end))))}))}}]),t}(o.a.Component)),Q=Object(K.withStyles)(function(e){return{flexcontainer:{display:"flex",flexDirection:"row"},container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200}}})(J),X=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).saveAnnouncement=function(){var e=n.props.post_id;n.state.body?n.state.title?I.a.put("/announcements/".concat(e),{user_id:999999993,announcement_title:n.state.title,announcement_body:n.state.body,status:"active"},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){return n.openModal(e)}).catch(function(e){console.log(e)}):I.a.put("/announcements/".concat(e),{user_id:999999993,announcement_body:n.state.body,status:"active"},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){return n.openModal(e)}).catch(function(e){console.log(e)}):I.a.put("/announcements/".concat(e),{user_id:999999993,announcement_title:n.state.title,status:"active"},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){return n.openModal(e)}).catch(function(e){console.log(e)})},n.openModal=function(){n.setState({openModal:!0,title:"",body:""})},n.closeModal=function(){n.props.onSave(),n.setState({openModal:!1})},n.deleteAnnouncement=function(){I.a.post("/announcements/status",{user_id:999992,id:n.props.post_id,status:"archive"},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(){return n.props.afterDelete()}).catch(function(e){return console.log(e)}),n.props.afterDelete()},n.handleTitleChange=n.handleTitleChange.bind(Object(U.a)(Object(U.a)(n))),n.handleBodyChange=n.handleBodyChange.bind(Object(U.a)(Object(U.a)(n))),n.saveAnnouncement=n.saveAnnouncement.bind(Object(U.a)(Object(U.a)(n))),n.deleteAnnouncement=n.deleteAnnouncement.bind(Object(U.a)(Object(U.a)(n))),n.announcementRef=o.a.createRef(),n.state={title:"Title",body:"Body",live:!0,target_post_id:"",deleted:!1,openModal:!1},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleTitleChange",value:function(e){this.setState({title:e})}},{key:"handleBodyChange",value:function(e){this.setState({body:e})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return R.isAuthenticated()?o.a.createElement(E.a,null,o.a.createElement(E.a.Row,{key:this.props.post_id},o.a.createElement(E.a.Column,{width:14},o.a.createElement(F.a,{innerRef:this.announcementRef},o.a.createElement(k.a,null,o.a.createElement(W.a,{ref:"body",inline:!0,apiKey:"2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds",initialValue:this.props.title,init:{menubar:!1},plugins:"link table wordcount textcolor visualblocks spellchecker",toolbar:"cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align image",onEditorChange:this.handleTitleChange},o.a.createElement("div",{ref:"title",name:"title",className:"title",dangerouslySetInnerHTML:{__html:this.props.title}})),o.a.createElement(W.a,{ref:"body",inline:!0,apiKey:"2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds",initialValue:this.props.body,init:{menubar:!1},plugins:"link table wordcount lists textcolor image",toolbar:"cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align numlist bullist image",onEditorChange:this.handleBodyChange},o.a.createElement("div",{name:"body",className:"body",dangerouslySetInnerHTML:{__html:this.props.body}}))))),o.a.createElement(E.a.Column,{floated:"right",verticalAlign:"middle",width:2},o.a.createElement(V.a,{name:"trash alternate",size:"large",onClick:this.deleteAnnouncement,inverted:!0}),o.a.createElement(V.a,{"data-post_id":this.props.post_id,name:"save",size:"large",onClick:this.saveAnnouncement,inverted:!0}),o.a.createElement(V.a,{name:"calendar times outline",size:"large",onClick:this.openModal,inverted:!0}),o.a.createElement(q.a,{size:"small",open:this.state.openModal,closeOnDimmerClick:this.closeOnDimmerClick,onClose:this.closeModal},o.a.createElement(q.a.Header,null,"Schedule your announcement"),o.a.createElement(q.a.Content,null,o.a.createElement(Q,{closeMod:this.closeModal,post_id:this.props.post_id})))))):o.a.createElement(E.a,null,o.a.createElement(E.a.Row,{key:this.props.post_id},o.a.createElement(E.a.Column,{width:14},o.a.createElement(F.a,{innerRef:this.announcementRef},o.a.createElement(k.a,null,o.a.createElement("div",{ref:"title",name:"title",className:"title",dangerouslySetInnerHTML:{__html:this.props.title}}),o.a.createElement("div",{name:"body",className:"body",dangerouslySetInnerHTML:{__html:this.props.body}}))))))}}]),t}(o.a.Component),Z=function(e){return o.a.createElement(Y.a,{icon:!0,labelPosition:"left",onClick:e.buttonClick},o.a.createElement(V.a,{name:"add"}),"Add Announcement")},$={containerStyle:{height:"150px",border:"1px black solid"}},ee=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).saveAnnouncement=function(e){var t=n.props.post_id;I.a.post("/announcements",{user_id:999999993,announcement_title:n.state.title,announcement_body:n.state.body,status:"active",announcementId:t},{headers:{Authorization:"Bearer ".concat(R.getIdToken())}}).then(function(e){n.setState({post_id:e.data.id,openModal:!0,title:"",body:""})}).catch(function(e){console.log(e)})},n.closeModal=function(){n.setState({openModal:!1}),n.props.onSave()},n.deleteAnnouncement=function(e){n.props.onDelete()},n.handleTitleChange=n.handleTitleChange.bind(Object(U.a)(Object(U.a)(n))),n.handleBodyChange=n.handleBodyChange.bind(Object(U.a)(Object(U.a)(n))),n.saveAnnouncement=n.saveAnnouncement.bind(Object(U.a)(Object(U.a)(n))),n.deleteAnnouncement=n.deleteAnnouncement.bind(Object(U.a)(Object(U.a)(n))),n.placeHolderRef=o.a.createRef(),n.state={title:"",body:"",live:!0,post_id:"",new_post_id:"",openModal:!1},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleTitleChange",value:function(e){this.setState({title:e})}},{key:"handleBodyChange",value:function(e){this.setState({body:e})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:14},o.a.createElement(F.a,{innerRef:this.placeHolderRef},o.a.createElement(k.a,{style:$.containerStyle},o.a.createElement(W.a,{ref:"body",inline:!0,apiKey:"2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds",initialValue:"<h1 style='text-align: center;'><span style='text-decoration: underline; color: #ffffff'>Title</span></h1>",init:{menubar:!1},plugins:"link table wordcount textcolor visualblocks spellchecker",toolbar:"cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align image",onEditorChange:this.handleTitleChange}),o.a.createElement(W.a,{ref:"body",inline:!0,apiKey:"2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds",initialValue:"<ul style='color: #ffffff'> <li> <h3 style='color: #ffffff'>Body</h3> </li> </ul>",init:{menubar:!1},plugins:"link table wordcount lists textcolor image",toolbar:"cut copy paste undo redo bold italic underline fontsizeselect forecolor backcolor align numlist bullist image",onEditorChange:this.handleBodyChange})))),o.a.createElement(E.a.Column,{floated:"right",verticalAlign:"middle",width:2},o.a.createElement(V.a,{name:"trash alternate",size:"large",onClick:this.props.onDelete,inverted:!0}),o.a.createElement(V.a,{name:"save",size:"large",onClick:this.saveAnnouncement,inverted:!0}),o.a.createElement(q.a,{open:this.state.openModal,size:"small"},o.a.createElement(q.a.Header,null,"Schedule your announcement"),o.a.createElement(q.a.Content,null,o.a.createElement(Q,{closeMod:this.closeModal,post_id:this.state.post_id}))))))}}]),t}(o.a.Component),te=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).clickAdd=function(){n.setState({add:!0,showAddButton:!1,savedSchedule:!1})},n.renderAnnouncement=function(){return n.state.fullAnnouncement.map(function(e){return o.a.createElement(X,{key:e.id,isLive:n.state.live,onDelete:n.deleteAnnouncement,onEditorChange:n.handleEditorChange,post_id:e.id,title:e.announcement_title,body:e.announcement_body,onSave:n.updateAfterSave,afterDelete:n.updateAfterDelete})})},n.updateAfterSave=function(){n.setState({savedSchedule:!0}),n.getActivePosts(),n.setState({add:!1,showAddButton:!0}),n.setState({showAddButton:!0})},n.clickDelete=function(){n.setState({add:!1,showAddButton:!0})},n.getActivePosts=function(){I.a.get("/announcements/liveStatus").then(function(e){n.setState({fullAnnouncement:e.data,title:e.title,body:e.body})}).catch(function(e){return console.log(e)})},n.updateAfterDelete=function(){n.setState({deleted:!0}),n.getActivePosts()},n.getBottomDimension=function(){},n.state={fullAnnouncement:[],title:"true",body:"true",content:"",live:!0,add:!1,deleted:!1,showAddButton:!0},n.setAnnouncementRef=function(e){n.announcementRef=e},n.handleEditorChange=n.handleEditorChange.bind(Object(U.a)(Object(U.a)(n))),n.clickAdd=n.clickAdd.bind(Object(U.a)(Object(U.a)(n))),n.getActivePosts=n.getActivePosts.bind(Object(U.a)(Object(U.a)(n))),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleEditorChange",value:function(e){this.setState({content:e})}},{key:"componentDidMount",value:function(){this.getActivePosts(),setTimeout(function(){},100)}},{key:"render",value:function(){return R.isAuthenticated()?o.a.createElement(F.a,{innerRef:this.setAnnouncementRef},o.a.createElement(k.a,{className:"announcementsCont",key:this.props.key,style:{padding:"3em 0em 0em",height:"100%"}},o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:16},this.renderAnnouncement(),this.state.showAddButton&&o.a.createElement(Z,{buttonClick:this.clickAdd}),this.state.add&&o.a.createElement(ee,{onDelete:this.clickDelete,boardB:this.props.boardBotto,onSave:this.updateAfterSave})))))):o.a.createElement(F.a,{innerRef:this.announcementsRef},o.a.createElement(k.a,{className:"announcementsCont",key:this.props.key,style:{padding:"3em 0em 0em"}},o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:16},this.renderAnnouncement())))))}}]),t}(o.a.Component),ne=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).editBackground=function(){},n.myRef=o.a.createRef(),n.annRef=o.a.createRef(),n.state={announcementBottom:"",boardBottom:"",backgroundColor:"#000000",backgroundImg:"https://www.solidbackgrounds.com/images/1024x768/1024x768-black-solid-color-background.jpg",backgroundUpdated:!1},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.backgroundColor!==e.backgroundColor&&this.setState({backgroundColor:this.props.backgroundColor}),this.props.backgroundImage!==e.backgroundImage&&this.setState({backgroundImg:this.props.backgroundImage})}},{key:"componentDidMount",value:function(){var e=this;I.a.get("/boards").then(function(t){return e.setState({backgroundImg:t.data[0].background_image})}).catch(function(e){return console.log(e)})}},{key:"getAnnouncementSize",value:function(){}},{key:"render",value:function(){var e={height:"768px",width:"1024px",margin:"0 auto",padding:"1em",backgroundImage:"url(".concat(this.state.backgroundImg,")"),flex:1};return o.a.createElement("div",{ref:this.myRef,style:e,onClick:this.editBackground},o.a.createElement(E.a,{style:{backgroundColor:"rgb(0,0,0,".concat(this.props.opacity,")")}},o.a.createElement(_,null),o.a.createElement(E.a.Row,null,o.a.createElement(te,{ref:this.annRef,boardBotto:this.state.boardBottom,getBottom:this.getAnnouncementSize}))))}}]),t}(o.a.Component),ae=Object(y.a)(ne),oe=n(696),ce=(n(616),n(618),n(347)),ie=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).log=function(e){var t=n.percentFormatter(e);n.props.didOpacityUpdate(t)},n.percentFormatter=function(e){return(.1*e).toFixed(1)},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("/");case 2:e.sent;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,{width:10},o.a.createElement("div",null,o.a.createElement(ce.a,{tipFormatter:this.percentFormatter,tipProps:{overlayClassName:"foo"},onChange:this.log,min:0,max:10,defaultValue:10|this.value})),o.a.createElement("p",{style:{textAlign:"left"}},"0",o.a.createElement("span",{style:{float:"right"}},"100%")))))}}]),t}(o.a.Component),le=n(700),re=[{key:"1",text:"1024 x 768",value:"1024 x 768"},{key:"2",text:"1280 x 720",value:"1280 x 720"},{key:"3",text:"1920 x 1080",value:"1920 x 1080"}],se=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).handleChange=function(e,t){var a=t.value;n.setState({resolution:a}),console.log(a)},n.state={resolution:""},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.resolution;return o.a.createElement(E.a,null,o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,null,o.a.createElement(j.a,null,"Resolution"),o.a.createElement(le.a,{onChange:this.handleChange,options:re,placeholder:"Choose an resolution",selection:!0,value:e}))))}}]),t}(a.Component),ue=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).openModal=function(){n.setState({modalOpen:!0})},n.handleBackgroundPosition=function(e,t){var a=t.value;return n.setState({value:a})},n.close=function(){n.setState({modalOpen:!1});var e={backgroundColor:n.state.backgroundColor,backgroundImage:n.state.imageURL};n.props.didBackgroundUpdate(e)},n.submitBackground=function(){I.a.put("/boards",{background_color:n.state.backgroundColor,background_image:n.state.imageURL,id:1}).then(function(e){return n.close(e)}).catch(function(e){return console.log(e)})},n.handleChangeComplete=function(e){n.setState({backgroundColor:e.hex})},console.log(e),n.inputRef=Object(a.createRef)(),n.state={modalOpen:!1,imageURL:"",backgroundColor:"",backgroundPosition:"center",opacity:0},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.modalOpen;return o.a.createElement(k.a,null,o.a.createElement(q.a,{open:t},o.a.createElement(q.a.Header,null,"Edit Background"),o.a.createElement(q.a.Content,null,o.a.createElement(E.a,{columns:2},o.a.createElement(E.a.Row,null,o.a.createElement(E.a.Column,null,o.a.createElement(j.a,null,"Add image as background"),o.a.createElement(oe.a,{ref:this.inputRef,onChange:function(t){return e.setState({imageURL:t.target.value})},placeholder:"url"}),o.a.createElement(j.a,{as:"h3"},"Opacity setting for display"),o.a.createElement(ie,this.props),o.a.createElement(se,null)),o.a.createElement(E.a.Column,null,o.a.createElement(z.a,{src:this.state.imageURL,size:"medium",centered:!0}))))),o.a.createElement(q.a.Actions,null,o.a.createElement(Y.a,{onClick:this.close,negative:!0},"Cancel"),o.a.createElement(Y.a,{onClick:this.submitBackground,positive:!0,labelPosition:"right",icon:"checkmark",content:"Save"}))),o.a.createElement(Y.a,{onClick:this.openModal},"Edit Background"))}}]),t}(o.a.Component),de=function(e){function t(e){var n;return Object(d.a)(this,t),n=Object(h.a)(this,Object(p.a)(t).call(this,e)),console.log(e),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement(k.a,null,o.a.createElement(ue,this.props))}}]),t}(o.a.Component),me=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(p.a)(t).call(this,e))).getBackground=function(e){n.setState({backgroundImage:e.backgroundImage}),n.props.didBackgroundUpdate(e)},n.getOpacity=function(e){console.log("de.js 43",e),n.props.didOpacityUpdate()},n.state={fullAnnouncement:[],title:"true",body:"true",content:"",live:!0,add:!1,backgroundColor:"",backgroundImage:""},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e){console.log("de.js 32",e.opacity),e.opacity,this.props.opacity}},{key:"render",value:function(){return R.isAuthenticated()?o.a.createElement("div",null,o.a.createElement(k.a,{key:this.props.key,style:{minHeight:"100vh",padding:"3em 0em 0em",backgroundColor:"white",marginTop:"5em",marginBottom:"5em",flex:1}},o.a.createElement(H,null),o.a.createElement(de,Object.assign({},this.props,{didBackgroundUpdate:this.getBackground})),o.a.createElement(ae,Object.assign({},this.props,{backgroundColor:this.state.backgroundColor,backgroundImage:this.state.backgroundImage}))),o.a.createElement(N,null)):o.a.createElement("div",null,o.a.createElement(k.a,{key:this.props.key,style:{minHeight:"100%",height:"100%",padding:"3em 0em 0em",backgroundColor:"white",marginTop:"5em",flex:1}},o.a.createElement(H,null),o.a.createElement(ae,{backgroundColor:this.state.backgroundColor,backgroundImage:this.state.backgroundImage})),o.a.createElement(N,null))}}]),t}(o.a.Component),he=Object(y.a)(me),pe=n(703),ge=n(701),fe=function(e){function t(){return Object(d.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(k.a,{style:{marginTop:"7em",minHeight:"100vh",flex:1}},o.a.createElement(H,null),o.a.createElement(j.a,null,"Welcome ",this.props.name),o.a.createElement(pe.a,null),o.a.createElement(ge.a,{celled:!0,selectable:!0},o.a.createElement(ge.a.Header,null,o.a.createElement(ge.a.Row,null,o.a.createElement(ge.a.HeaderCell,null,"Title"),o.a.createElement(ge.a.HeaderCell,null,"Date"),o.a.createElement(ge.a.HeaderCell,null,"Options"))))),o.a.createElement(N,null))}}]),t}(o.a.Component),be=Object(y.a)(fe),ye=function(e){function t(){return Object(d.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(L.a,{className:"MainStyle",style:{marginTop:"3em",minHeight:"100vh",flex:1}},o.a.createElement(H,null),o.a.createElement(E.a,{textAlign:"center",style:{margin:"5em 0em 0em",padding:"5em 0em"}},o.a.createElement(E.a.Row,{verticalAlign:"middle",textAlign:"center"},o.a.createElement(E.a.Column,{width:16},o.a.createElement(j.a,{style:{fontSize:"3rem",padding:"0em 0em 1em"}},"Make announcements faster."),o.a.createElement(j.a,{as:"h1"},"Get started here"),!R.isAuthenticated()&&o.a.createElement(Y.a,{size:"massive",onClick:R.signIn},"Add Announcement"),R.isAuthenticated()&&o.a.createElement(Y.a,{size:"massive"},o.a.createElement(P.a,{to:"/displayeditor"},"Add Announcement")),o.a.createElement(j.a,{as:"h1"},"Already have a post?"))),o.a.createElement(E.a.Row,{columns:2},o.a.createElement(E.a.Column,{width:"4",textAlign:"center"},o.a.createElement(Y.a,{size:"massive"},o.a.createElement(P.a,{to:"/display",target:"_blank"},"View Live Post"))),o.a.createElement(E.a.Column,{width:"4",textAlign:"center"},!R.isAuthenticated()&&o.a.createElement(Y.a,{size:"massive",onClick:R.signIn},"View Previous Posts"),R.isAuthenticated()&&o.a.createElement(Y.a,{size:"massive"},o.a.createElement(P.a,{to:"/profile"},"View Previous Posts")))))),o.a.createElement(N,null))}}]),t}(o.a.Component),ke=Object(y.a)(ye),Ee=function(e){function t(){return Object(d.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.handleAuthentication();case 2:this.props.history.replace("/");case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.a.createElement("p",null,"Loading profile...")}}]),t}(a.Component),ve=Object(y.a)(Ee),Oe=n(346),je=n.n(Oe)()();var Se=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={backgroundImage:"",opacity:0},n.getOpacity=function(e){console.log("this gotOPacity"),n.setState({opacity:e})},n.getBackground=function(e){n.setState({backgroundImage:e.backgroundImage})},n.componentDidUpdate=function(e,t){console.log(n.state.opacity),console.log("comp did update",t),console.log(n.state.opacity!==t.opacity),n.state.opacity!==t.opacity&&console.log("update opa in",n.state.opacity)},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("/callback"!==this.props.location.pathname){e.next=3;break}return this.setState({checkingSession:!1}),e.abrupt("return");case 3:return e.prev=3,e.next=6,R.silentAuth();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),"login_required"!==e.t0.error&&console.log(e.t0.error);case 11:this.setState({checkingSession:!1});case 12:case"end":return e.stop()}},e,this,[[3,8]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(f.a,{history:je},o.a.createElement("div",null,o.a.createElement(b.a,{path:"/",exact:!0,render:function(e){return o.a.createElement(ke,Object.assign({auth:R},e))}}),o.a.createElement(b.a,{path:"/display",render:function(t){return o.a.createElement(M,Object.assign({auth:R,bk:e.state.backgroundImage,opacity:e.state.opacity},t))}}),o.a.createElement(b.a,{path:"/displayeditor",render:function(t){return o.a.createElement(he,Object.assign({auth:R,didBackgroundUpdate:e.getBackground,didOpacityUpdate:e.getOpacity,opacity:e.state.opacity},t))}}),o.a.createElement(b.a,{path:"/profile",render:function(t){return o.a.createElement(be,Object.assign({auth:R,bk:e.state.backgroundImage},t))}}),o.a.createElement(b.a,{exact:!0,path:"/callback",component:ve}))))}}]),t}(a.Component),Ce=Object(y.a)(Se);i.a.render(o.a.createElement(l.a,null,o.a.createElement(Ce,null)),document.getElementById("root"))}},[[358,2,1]]]);
//# sourceMappingURL=main.47c8a9dc.chunk.js.map