const $ =docmunet.querySelector.bind(document);
$('darkBtn').addEventListener('click', toggleDark)

function toggleDark(){
    if($(':root').hasAttribute('dark-mode')){
        $(':root').removeAttribute('dark-mode');
    }else{
        $(':root').setAttribute('dark-mode', ture);
    }
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        toggleDark();
    }
}
