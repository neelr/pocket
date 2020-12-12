let token = ""
let reload = async () => {
    document.getElementById(`yee`).innerHTML = (await browser.tabs.query({ currentWindow: true, active: true }))[0].url
    document.getElementById(`pages`).innerHTML = ``
    let res = await fetch(`https://db.neelr.dev/api/${token}`)
    let { pages } = await res.json()
    console.log(pages)
    pages.forEach(url => {
        add(url)
    })
}
let add = url => {
    let button = document.createElement(`button`);
    button.innerHTML = `Remove`;
    button.className = `delete`
    let ul = document.getElementById(`pages`);
    let li = document.createElement(`li`);
    let a = document.createElement(`a`)
    a.href = url
    a._target = `blank`
    a.appendChild(document.createTextNode(url))
    li.appendChild(a);
    li.appendChild(button)
    button.addEventListener(`click`, async () => {
        let res = await fetch(`https://db.neelr.dev/api/${token}`)
        let { pages } = await res.json()
        count = 0
        pages = pages.filter(v => v != url ? true : count || (++count && false))
        await fetch(`https://db.neelr.dev/api/${token}`, {
            method: `POST`,
            mode: `cors`,
            body: JSON.stringify({ pages: pages }),
            headers: {
                "content-type": `application/json`
            }
        })
        reload()
    });
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded', reload, false);

document.getElementById(`add`).onclick = async () => {
    let res = await fetch(`https://db.neelr.dev/api/${token}`)
    let { pages } = await res.json()
    let url = (await browser.tabs.query({ currentWindow: true, active: true }))[0].url
    add(url)
    pages.push(url)
    await fetch(`https://db.neelr.dev/api/${token}`, {
        method: `POST`,
        mode: `cors`,
        body: JSON.stringify({ pages: pages }),
        headers: {
            "content-type": `application/json`
        }
    }).then(v => v.text).then(b => console.log(b))
}