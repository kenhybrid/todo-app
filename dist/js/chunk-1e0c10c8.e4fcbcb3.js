(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e0c10c8"],{"048f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{staticClass:"pa-3",attrs:{tile:"",flat:""}},[a("v-app-bar",{attrs:{elevation:"0",color:"white"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(){return t.$router.go(-1)}}},[a("v-icon",{attrs:{color:"primary"}},[t._v("mdi-arrow-left")])],1),a("v-subheader",{staticClass:"center"},[t._v("CREATE A TASK")]),a("v-spacer")],1),a("v-form",{staticClass:"py-5 px-2"},[a("v-text-field",{attrs:{label:"Add a Task",outlined:"",clearable:"","prepend-inner-icon":"mdi-pencil-outline"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),a("v-dialog",{ref:"dialog",attrs:{"return-value":t.date,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:"Duedate","prepend-inner-icon":"mdi-calendar",readonly:"",outlined:"",clearable:""},model:{value:t.dueDate,callback:function(e){t.dueDate=e},expression:"dueDate"}},"v-text-field",r,!1),n))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("v-date-picker",{attrs:{scrollable:""},model:{value:t.dueDate,callback:function(e){t.dueDate=e},expression:"dueDate"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.modal=!1}}},[t._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.dialog.save(t.date)}}},[t._v(" OK ")])],1)],1),a("v-select",{attrs:{items:t.items,label:"Priority","prepend-inner-icon":"mdi-view-list-outline",outlined:""},model:{value:t.priority,callback:function(e){t.priority=e},expression:"priority"}}),a("v-btn",{staticClass:"primary",attrs:{fab:"",bottom:"",right:"",fixed:"",dark:""},on:{click:t.addTodo}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-content-save-outline")])],1)],1)],1),a("v-snackbar",{attrs:{bottom:"",timeout:"3000"},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[a("v-icon",{staticClass:"px-5",attrs:{color:"error"}},[t._v("mdi-alert")]),t._v(" Please fill in all fields! ")],1)],1)},r=[],i=(a("accc"),a("0d03"),{data:function(){return{items:["High","Medium","Low"],modal:!1,snackbar:!1,date:"",dueDate:"",content:"",createdAt:(new Date).toISOString(),done:!1,priority:""}},methods:{addTodo:function(){var t=this;""!=this.content&&""!=this.priority&&""!=this.dueDate?this.$store.dispatch("createTodo",{content:this.content,dueDate:this.dueDate,createdAt:this.createdAt,done:this.done,priority:this.priority}).then((function(){t.content="",t.priority="",t.dueDate=""})):this.snackbar=!0}}}),o=i,c=a("2877"),l=a("6544"),s=a.n(l),d=a("40dc"),u=a("8336"),p=a("b0af"),v=a("2e4b"),f=a("169a"),b=a("4bd4"),m=a("132d"),h=a("b974"),k=a("2db4"),g=a("2fa4"),D=a("e0c7"),x=a("8654"),y=Object(c["a"])(o,n,r,!1,null,null,null);e["default"]=y.exports;s()(y,{VAppBar:d["a"],VBtn:u["a"],VCard:p["a"],VDatePicker:v["a"],VDialog:f["a"],VForm:b["a"],VIcon:m["a"],VSelect:h["a"],VSnackbar:k["a"],VSpacer:g["a"],VSubheader:D["a"],VTextField:x["a"]})},"64e5":function(t,e,a){"use strict";var n=a("d039"),r=a("0ccb").start,i=Math.abs,o=Date.prototype,c=o.getTime,l=o.toISOString;t.exports=n((function(){return"0385-07-25T07:06:39.999Z"!=l.call(new Date(-50000000000001))}))||!n((function(){l.call(new Date(NaN))}))?function(){if(!isFinite(c.call(this)))throw RangeError("Invalid time value");var t=this,e=t.getUTCFullYear(),a=t.getUTCMilliseconds(),n=e<0?"-":e>9999?"+":"";return n+r(i(e),n?6:4,0)+"-"+r(t.getUTCMonth()+1,2,0)+"-"+r(t.getUTCDate(),2,0)+"T"+r(t.getUTCHours(),2,0)+":"+r(t.getUTCMinutes(),2,0)+":"+r(t.getUTCSeconds(),2,0)+"."+r(a,3,0)+"Z"}:l},accc:function(t,e,a){var n=a("23e7"),r=a("64e5");n({target:"Date",proto:!0,forced:Date.prototype.toISOString!==r},{toISOString:r})}}]);
//# sourceMappingURL=chunk-1e0c10c8.e4fcbcb3.js.map