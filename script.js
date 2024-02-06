const $ = document.querySelector.bind(document);

$('.dark-mode-toggle').addEventListener('click', toggleDark)

function toggleDark(){
    if($(':root').hasAttribute('dark-mode')){
        $(':root').removeAttribute('dark-mode');
        localStorage.removeItem("dark-mode")
    }else{
        $(':root').setAttribute('dark-mode', true);
        localStorage.setItem("dark-mode", true)

    }

}

document.addEventListener("DOMContentLoaded", () => {
    const lsData = localStorage.getItem("dark-mode");
    console.log({lsData})
    if(lsData == 'true') {
        $(':root').setAttribute('dark-mode', true);
    } else {
        $(':root').removeAttribute('dark-mode');
    }
})