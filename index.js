import{a as g,S as L,i as a}from"./assets/vendor-5YrzWRhu.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const v="51945757-a6508522bd1a0e2757f375d6a",w="https://pixabay.com/api/",b=15;async function q(r,o=1){try{return(await g.get(w,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:b,page:o}})).data}catch(e){throw console.error("Error fetching images:",e),e}}const f=document.querySelector(".gallery"),m=document.querySelector(".load-more"),y=document.querySelector(".loader");let S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function P(r){const o=r.map(e=>`
      <div class="photo-card">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </div>
    `).join("");f.insertAdjacentHTML("beforeend",o),S.refresh()}function B(){f.innerHTML=""}function E(){y.classList.add("visible")}function d(){y.classList.remove("visible")}function $(){m.classList.add("visible")}function c(){m.classList.remove("visible")}const I=document.querySelector("#search-form"),M=document.querySelector(".load-more");let n=1,p="",u=0;I.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.elements.searchQuery.value.trim();if(!o){a.warning({message:"Please enter a search term!"});return}p=o,n=1,B(),c(),await h()});M.addEventListener("click",async()=>{n+=1,await h()});async function h(){E();try{const r=await q(p,n);if(d(),r.hits.length===0){a.info({message:"No images found for your query."}),c();return}if(P(r.hits),u=r.totalHits,document.querySelectorAll(".gallery .photo-card").length<u?$():(c(),a.info({message:"We're sorry, but you've reached the end of search results."})),n>1){const{height:e}=document.querySelector(".gallery .photo-card").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}catch{d(),a.error({message:"Failed to fetch images."})}}
//# sourceMappingURL=index.js.map
