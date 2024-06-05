// 加载 HTML 的通用函数
function loadHtml(id, url, callback) {
  // 使用 fetch API 获取外部文件内容
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          // 将获取到的 HTML 内容插入到指定的元素中
          document.getElementById(id).innerHTML = data;
          if (callback) callback();
      })
      .catch(error => console.error('Error loading HTML:', error));
}

function setActiveNav(page) {
    const navItems = document.querySelectorAll('#header-container [data-page]');
    navItems.forEach(item => {
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active'); // 添加活动状态类
        } else {
            item.classList.remove('active');
        }
    });
}

// 在 DOM 完全加载后，加载头部和尾部
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = document.documentElement.getAttribute('data-page');
    console.log('data-page:', currentPage);
    loadHtml("header-container", "/common/header.html", () => setActiveNav(currentPage));
    loadHtml("footer-container", "/common/footer.html");
});