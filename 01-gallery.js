import"./assets/styles-hXN8BbFG.js";import{s as f,i as c}from"./assets/vendor-DnUmO7qu.js";const T=document.querySelector("#form"),g=document.querySelector("#form-input"),v=document.querySelector("#loader"),o=document.querySelector("#gallery");let l="";const D="https://pixabay.com/api/",t=(a,s)=>Object.assign(document.createElement(a),s),V=({webformatURL:a,largeImageURL:s,tags:e,likes:n,views:y,comments:N,downloads:x})=>{const r=t("a",{className:"lightbox-link",href:s}),i=t("li",{className:"result"}),w=t("img",{className:"result-pic",src:a,alt:e}),d=t("div",{className:"result-desc"}),m=t("div",{className:"desc-el"}),b=t("p",{className:"desc-header",textContent:"Likes"}),E=t("p",{className:"desc-value",textContent:n});m.append(b,E);const p=t("div",{className:"desc-el"}),L=t("p",{className:"desc-header",textContent:"Views"}),S=t("p",{className:"desc-value",textContent:y});p.append(L,S);const h=t("div",{className:"desc-el"}),C=t("p",{className:"desc-header",textContent:"Comments"}),k=t("p",{className:"desc-value",textContent:N.toString()});h.append(C,k);const u=t("div",{className:"desc-el"}),q=t("p",{className:"desc-header",textContent:"Downloads"}),H=t("p",{className:"desc-value",textContent:x});return u.append(q,H),d.append(m,p,h,u),r.append(w),i.append(r,d),i},P=(a,s)=>{const e=document.createDocumentFragment();e.append(...a.map(V)),s.append(e)};let j=new f("#gallery a",{captionsData:"alt",captionDelay:250,animationSpeed:250,fadeSpeed:250,scrollZoom:!1});T.addEventListener("submit",a=>{a.preventDefault(),o.innerHTML="",o.innerHTML!==""&&f.refresh(),l=g.value.trim();const s=new URLSearchParams({key:"35169635-92091552d9eccdba3eb57d7a9",q:l,image_type:"photo",orientation:"horizontal",safesearch:"true"});l!==""?(v.classList.remove("visibility"),fetch(D+"?"+s).then(e=>{if(!e.ok)throw new Error(e.status,e.statusText);return v.classList.add("visibility"),e.json()}).then(e=>{e.hits.length===0&&c.error({message:"Sorry, there are no images matching your search query. Please try again!"});const n=e.hits;return g.value="",n}).then(e=>{P(e,o),j.refresh()}).catch(e=>{console.log(e),c.error({message:"Oh no! There is an error!"+e})})):c.info({message:"Type correct search params!"})});
//# sourceMappingURL=01-gallery.js.map
