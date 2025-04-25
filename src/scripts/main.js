window.addEventListener('DOMContentLoaded', (event) => {
  
  // Demos

  const updateClasses = document.querySelectorAll('.demo-class-update');

	for (const item of updateClasses) {
		let target = item.dataset['target'];
    if (!target) return;

    let targetElement = document.querySelectorAll(item.dataset['target']);
    for (const item of targetElement) {
      item.updateClass = {};
      item.updateClass.currentClass = [...item.classList];
    }


    item.addEventListener('change', (event) => {
      // let targetElement = document.querySelectorAll(item.dataset['target']);

      let oldClass = [];
      for (const option of event.target.options) {
        oldClass.push(option.value.split(' '))
      }
      oldClass = oldClass.flat();

      let newClass = event.target.value.split(' ');

      for (const demo of targetElement) {
        let oldClassToApply = oldClass.filter(x => !demo.updateClass.currentClass.includes(x));
        let newClassToApply = newClass.filter(x => !demo.updateClass.currentClass.includes(x));

        console.log(demo, demo.updateClass.currentClass, oldClass, oldClassToApply)

        for (const item of oldClassToApply) {
          let cssClass = item;
          if (cssClass) demo.classList.remove(item);
        }        
        
        for (const item of newClassToApply) {
          let cssClass = item;
          if (cssClass) demo.classList.add(item);
        }
      }
    })
    
	};


  
  // Site

  // Encoded text
  const encodeElements = document.querySelectorAll('.encode');
  for (const item of encodeElements) {
    let decode = atob(item.dataset['encode']);

    if (item.dataset['encodeAttribute']) {
      item.setAttribute(`${item.dataset['encodeAttribute']}`, `${decode}`);
    }
  }

  // Observe header height
  const observeHeader = function() {
    let element = document.querySelector('.header');
    let height = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let heightNew = entry.contentBoxSize[0].blockSize;

        if (height !== heightNew) {
          height = entry.contentBoxSize[0].blockSize;
  
          document.documentElement.style.setProperty(`--header-height`, `${height}px`);            
        } 
      }
  
    });
  
    resizeObserver.observe(element);
  }

  observeHeader();

});
