import{u as F,r as s,c,d as V,b as t,t as v,x as _,B as D,C as u,D as C,E as S,n as j,G as E,H as n,k as b,m as f,z as B,a as y,I as M}from"./index-DE0sq3M8.js";const N={class:"min-h-screen flex"},L={class:"w-full md:w-1/2 bg-white p-8 flex items-center justify-center"},W={class:"w-full max-w-md"},I={key:0,class:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"},O={class:"relative"},P=["type"],U={class:"flex items-center justify-between relative top-[-10px]"},q=["disabled"],z={class:"mt-1 text-center"},R={class:"text-gray-600"},G={__name:"Login",setup(T){const g=M(),w=F(),i=s(""),d=s(""),m=s(!1),o=s(!1),a=s(!1),r=s(""),k=()=>{o.value=!o.value},h=async()=>{try{a.value=!0,r.value="",await w.login(i.value,d.value),g.push("/")}catch(p){r.value=p.message}finally{a.value=!1}};return(p,e)=>{const x=B("router-link");return y(),c("div",N,[e[11]||(e[11]=V('<div class="hidden md:flex md:w-1/2 bg-app-dark items-center justify-center p-8"><div class="text-center"><h2 class="text-3xl font-bold text-white mb-4"> Welcome back </h2><p class="text-gray-400">Login to continue</p><img src="" alt="Welcome" class="mt-8 max-w-xs mx-auto"></div></div>',1)),t("div",L,[t("div",W,[e[9]||(e[9]=t("div",{class:"flex justify-center items-center"},[t("img",{src:"",alt:"Welcome",class:"h-[150px] w-[170px] mb-[30px]"})],-1)),e[10]||(e[10]=t("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Welcome Back",-1)),r.value?(y(),c("div",I,v(r.value),1)):_("",!0),t("form",{onSubmit:D(h,["prevent"]),class:"space-y-6 mb-[20px] text-black"},[t("div",null,[e[3]||(e[3]=t("label",{class:"flex justify-start text-sm font-medium text-gray-700 mb-1"},"Email",-1)),u(t("input",{type:"email","onUpdate:modelValue":e[0]||(e[0]=l=>i.value=l),placeholder:"Email",class:"w-full p-2 border rounded-[60px]",required:""},null,512),[[C,i.value]])]),t("div",O,[e[4]||(e[4]=t("label",{class:"flex justify-start text-sm font-medium text-gray-700 mb-1"},"password",-1)),u(t("input",{type:o.value?"text":"password","onUpdate:modelValue":e[1]||(e[1]=l=>d.value=l),placeholder:"Password",class:"w-full p-2 border rounded-[60px] pr-10",required:""},null,8,P),[[S,d.value]]),t("button",{type:"button",onClick:k,class:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"},[t("i",{class:j([o.value?"IoEyeOffOutline":"IoEyeOutline","text-xl"])},null,2)])]),t("div",U,[t("div",null,[t("label",null,[u(t("input",{type:"checkbox","onUpdate:modelValue":e[2]||(e[2]=l=>m.value=l),class:"mr-1"},null,512),[[E,m.value]]),e[5]||(e[5]=n(" Remember me "))])]),t("div",null,[b(x,{to:"/forgot-password",class:"text-[#7F3DFF]"},{default:f(()=>e[6]||(e[6]=[n(" Forgot password? ")])),_:1})])]),t("button",{type:"submit",disabled:a.value,class:"w-full bg-[#7F3DFF] text-white p-2 rounded-[60px] disabled:opacity-50 relative top-[-15px]"},v(a.value?"Logging in...":"Login"),9,q)],32),t("div",z,[t("p",R,[e[8]||(e[8]=n(" Don't have an account? ")),b(x,{to:"/signup",class:"text-[#7F3DFF]"},{default:f(()=>e[7]||(e[7]=[n(" Sign up ")])),_:1})])])])])])}}};export{G as default};
