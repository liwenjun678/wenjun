document.addEventListener('DOMContentLoaded', function() {
    const foodDisplay = document.getElementById('foodDisplay');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const foodInput = document.getElementById('foodInput');
    const saveBtn = document.getElementById('saveBtn');
    
    // 默认食物列表
    let foods = [
        "米饭", "面条", "饺子", "包子", "汉堡",
        "披萨", "沙拉", "炒饭", "寿司", "牛排",
        "火锅", "烧烤", "三明治", "粥", "馄饨"
    ];
    
    // 尝试从本地存储加载食物列表
    loadFoods();
    
    // 随机选择食物
    randomizeBtn.addEventListener('click', function() {
        if (foods.length === 0) {
            foodDisplay.innerHTML = '<p>请先添加食物列表</p>';
            return;
        }
        
        // 添加动画效果
        foodDisplay.classList.add('animation');
        
        // 随机选择过程中的效果
        let iterations = 0;
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * foods.length);
            foodDisplay.textContent = foods[randomIndex];
            
            iterations++;
            if (iterations > 10) {
                clearInterval(interval);
                foodDisplay.classList.remove('animation');
                
                // 最终选择
                const finalChoice = foods[Math.floor(Math.random() * foods.length)];
                foodDisplay.innerHTML = `<span class="final-choice">${finalChoice}</span>`;
                
                // 保存最后选择的时间
                localStorage.setItem('lastSelectedFood', finalChoice);
                localStorage.setItem('lastSelectionTime', new Date().toISOString());
            }
        }, 100);
    });
    
    // 保存食物列表
    saveBtn.addEventListener('click', function() {
        const foodText = foodInput.value.trim();
        if (foodText) {
            foods = foodText.split('\n').filter(item => item.trim() !== '');
            localStorage.setItem('foodList', JSON.stringify(foods));
            alert('食物列表已保存！');
        }
    });
    
    // 从本地存储加载食物列表
    function loadFoods() {
        const savedFoods = localStorage.getItem('foodList');
        if (savedFoods) {
            foods = JSON.parse(savedFoods);
            foodInput.value = foods.join('\n');
        }
        
        const lastSelected = localStorage.getItem('lastSelectedFood');
        const lastTime = localStorage.getItem('lastSelectionTime');
        if (lastSelected && lastTime) {
            const lastDate = new Date(lastTime);
            foodDisplay.innerHTML = `上次选择 (${formatDate(lastDate)})<br><span class="final-choice">${lastSelected}</span>`;
        }
    }
    
    // 格式化日期
    function formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
});