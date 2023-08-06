// ==UserScript==
// @name         微软奖励
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Microsoft Rewards
// @author       MM
// @match        https://*.bing.com/*
// @icon         https://i.hd-r.cn/64cd9408a9afabef2c1d307366dff201.png

// ==/UserScript==
(function() {
    'use strict';
    console.log("[info] successful match");
    var num = localStorage.getItem('searchNumber') || 0;
    const aContainer = document.createElement('div');
    const aSpan1 = document.createElement('span');
    const aSpan2 = document.createElement('span');
    const aSpanNum = document.createElement('span');

    const imgStatus = document.createElement('img');

    const imgLogo = document.createElement('img');

    imgLogo.src = 'https://i.hd-r.cn/64cd9408a9afabef2c1d307366dff201.png';
    imgLogo.style.width = '20px';
    imgLogo.style.height = '20px';
    aContainer.setAttribute('class','id_button');
    aSpan1.id='aSpan1';
    aSpan1.style.display = 'flex';
    aSpan1.style.alignItems = 'center';
    aSpan1.style.justifyContent = 'center';
    aSpan1.appendChild(imgLogo);
    const n = document.createElement('span');
    n.textContent= '脚本';
    aSpan1.appendChild(n);

    aSpanNum.textContent = num;
    aSpanNum.style.color = "red";
    aSpanNum.style.fontWeight = 'bold';
    aSpanNum.style.display = 'flex';
    aSpanNum.style.alignItems = 'center';
    aSpanNum.style.justifyContent = 'center';

    aSpan2.id='aSpan2';
    aSpan2.style.display = 'flex';
    aSpan2.style.alignItems = 'center';
    aSpan2.style.justifyContent = 'center';
    imgStatus.style.width = '20px';
    imgStatus.style.height = '20px';
    imgStatus.style.display = 'flex';
    imgStatus.style.alignItems = 'center';
    imgStatus.style.justifyContent = 'center';
    aSpan2.appendChild(imgStatus);

    aContainer.appendChild(aSpan1);
    aContainer.appendChild(aSpan2);
    aContainer.appendChild(aSpanNum);

    var parent = document.getElementById('id_h');

    parent.insertBefore(aContainer,parent.firstChild);

    updateImgStatus();
    loop();

    aContainer.addEventListener('dblclick', function() { // 添加点击事件监听器
        const n = window.prompt('搜索次数:');
        var num = n;
        localStorage.setItem('searchNumber',num);
        console.log("[info] input:"+ n+" save:"+num);
        loop();
    });
    imgStatus.addEventListener('click', function() { // 添加点击事件监听器
        var num = localStorage.getItem('searchNumber')|| 0 ;
        if(num>0){
            localStorage.setItem('searchNumber',0);
            updateImgStatus();
        }else{
            localStorage.setItem('searchNumber',10);
            loop();
        }
    });

    function loop(){
        const intervalId = setInterval(function() {
            var num = localStorage.getItem('searchNumber');
            if(num > 0) {
                console.log("[info] count:"+num);
                num = num - 1;
                localStorage.setItem('searchNumber',num);
                const searchBox = document.getElementById('sb_form_q');
                searchBox.value = generateRandomSearch();
                console.log("[info] search:"+searchBox.value);
                searchBox.dispatchEvent(new Event('input')); // 触发输入框的输入事件，以便提交表单
                // Submit the search
                const searchForm = document.getElementById('sb_form');
                searchForm.submit();
            }else{
                clearInterval(intervalId); // 停止循环
                //window.close(); // 关闭 Bing 页面
                console.log("[info] cancel");
            }
        },1000);
    }
    function updateImgStatus(){
        var num = localStorage.getItem('searchNumber');
        const pause = 'data:image/png;base64,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';
        const play = 'data:image/png;base64,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';
        if(num>0){
            imgStatus.src = pause;
        }else{
            imgStatus.src = play;
        }
    }
})();

function generateRandomSearch() {
    let search = '';
    // Generate a random string of 4 digits and 1 letter
    for (let i = 0; i < 4; i++) {
        search += Math.floor(Math.random() * 10);
    }
    search += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    return search;
}



