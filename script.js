const url = 'https://design.propcom.co.uk/buildtest/accordion-data.json'

const createAccordionItem = (item, accordionParent) => {
  //Create a generic accordion section container and set class attibute
  const accordionBlock = document.createElement('div');
  accordionBlock.classList.add("accordion");
    
  //Create a generic accordion section header container and set class attibutes
  const blockHead = document.createElement('div');
  blockHead.classList.add('section_header');

    
  //Create a generic accordion section contents container set class attibute
  const blockContent = document.createElement('div');
  blockContent.classList.add('section_contents');
  
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

  //when an accordion header is clicked, handleAccordionClick is called.          
  function handleAccordionClick(event) {
    showAccordion(event.currentTarget);
  }

  // Hide current Accordion and show new accordion.  
  function showAccordion(accordion){
    //Hide current one. First time it will be null. 
     var expandedAccordion = accordionEl.querySelector(".active");
     if (expandedAccordion){
         expandedAccordion.classList.remove("active");
     }
     //Show new one
     accordion.classList.add("active");

  }

  var allAccordionEls = accordionEl.querySelectorAll(".accordion");
  for (var i = 0, len = allAccordionEls.length; i < len; i++){
       allAccordionEls[i].addEventListener("click", handleAccordionClick);
  }

}

const loadData = () => {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      renderAccordion(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

window.onload = loadData; 