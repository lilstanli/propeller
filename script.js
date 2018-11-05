const url = 'https://design.propcom.co.uk/buildtest/accordion-data.json'

const createAccordionItem = (item, accordionParent) => {
  //Create a generic accordion section container and set class attibute
  const accordionBlock = document.createElement('div');
  accordionBlock.classList.add("accordion_block");
    
  //Create a generic accordion section header container and set class attibutes
  const blockHead = document.createElement('div');
  blockHead.classList.add('block_header');

    
  //Create a generic accordion section contents container set class attibute
  const blockContent = document.createElement('div');
  blockContent.classList.add('block_contents');
  
  //Create a header element
  const heading = document.createElement('h1');
  
  //create icon element to house the up or down icon and set attributes
  const upIcon = document.createElement('i');
  upIcon.classList.add('arrow_icon', 'fa', 'fa-angle-up');

  //append generic section to main accordion container
  accordionParent.appendChild(accordionBlock);

  //append accordion header to generic accordion section container
  accordionBlock.appendChild(blockHead);

  //append accordion heading and icon to the head container
  blockHead.appendChild(heading);
  blockHead.appendChild(upIcon);
  
  //append accordion contents to its main section container
  accordionBlock.appendChild(blockContent);      
  
  //inject contents
  heading.textContent = item.heading;
  blockContent.textContent = item.content;
}

const renderAccordion = ({ blocks }) => {
  const accordionEl = document.getElementById("accordion")

  blocks.forEach(blockItem => {
    createAccordionItem(blockItem, accordionEl)
  });

  initAccordion(accordionEl)
}

function initAccordion(accordionEl) {

  //handleAccordionClick is called.          
  function handleAccordionClick(event) {
    showAccordion(event.currentTarget);
  }

  // Hide current and show new.  
  function showAccordion(accordion){

    //Hide current 
    let expandedAccordion = accordionEl.querySelector(".active");

     if (expandedAccordion){
          expandedAccordion.classList.remove("active");
          expandedAccordion.firstChild.lastChild.classList.remove("flip_icon");
    }
     //Show another
     accordion.classList.add("active");
     accordion.firstChild.lastChild.classList.add("flip_icon")

  }

  let allAccordionEls = accordionEl.querySelectorAll(".accordion_block");
  for (let i = 0, len = allAccordionEls.length; i < len; i++){
       allAccordionEls[i].addEventListener("click", handleAccordionClick);
  }
  //By Default Show first accordion
  showAccordion(allAccordionEls[0])
}

const loadData = () => {
  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      renderAccordion(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

window.onload = loadData; 