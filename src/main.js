const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)  //string to object
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.amazon.ca/'},
    {logo: 'B', url: 'https://www.bing.com/'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')

}
const render = () => {
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e)=>{
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('Please entry a new site address.')

        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap) //object to string
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e)=> {
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})

