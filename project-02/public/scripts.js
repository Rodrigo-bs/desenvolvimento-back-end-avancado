const form = document.querySelector('form')

async function addElement(element) {
    const myFetch = await fetch('http://localhost:5000/?name='+element.nameValue+'&url='+element.urlValue)
        .then(r => r.status)
        .then(r => {
            if (r == 200) {
                alert('Adicionado com Sucesso!');
                limparInputs();
            } else {
                alert('Algo correu Errado!');
                limparInputs();
            }
        })

    writeElement();
}

async function removeElement(element) {
    const url = element.currentTarget.parentNode.querySelector('a').getAttribute('url');
    const name = element.currentTarget.parentNode.querySelector('a').getAttribute('name');

    console.log('http://localhost:5000/?name='+name+'&url='+url+'&del=1')

    const myFetch = await fetch('http://localhost:5000/?name='+name+'&url='+url+'&del=1')
        .then(r => r.status)
        .then(r => {
            if (r == 200) {
                alert('Deletado com Sucesso!');
            } else {
                alert('Algo correu Errado!');
            }
        });

    writeElement();
}

function writeElement() {
    fetch('http://localhost:5000/')
        .then(r => r.json())
        .then(r => {
            appendElementInMyUl(r.urls);
            })
}

function appendElementInMyUl(urls) {
    const ul = document.querySelector('[data-ul="container"]')
    
    ul.innerHTML = '';
    urls.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('url-item');

        const a = document.createElement('a');
        a.setAttribute('url', item.url)
        a.setAttribute('name', item.name)
        a.innerText = item.name;
        a.href = item.url;

        const button = document.createElement('button');
        button.classList.add('url-button');
        button.innerText = 'Deletar';

        li.appendChild(a);
        li.appendChild(button);
        ul.appendChild(li);
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', removeElement)
    })
}

function limparInputs() {
    form.querySelector('input[name="name"]').value = '';
    form.querySelector('input[name="url"]').value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValue = form.querySelector('input[name="name"]').value;
    const urlValue = form.querySelector('input[name="url"]').value;

    if (!nameValue && !urlValue) {
        alert('Preencha os campos!');
    } else {
        addElement({ nameValue, urlValue });
    }
})

writeElement();