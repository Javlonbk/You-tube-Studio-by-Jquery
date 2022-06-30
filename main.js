
$('.add').on('click', () => {

    let oldurl = $('.url').val();
    let name = $('.name').val();
    let url = oldurl.replace('youtu.be', 'www.youtube.com/embed');

    if (url != '' && name != '') {
        allVideos.push({
            name: name,
            url: url
        })
        $('.alert').addClass('d-none')
    } else {
        $('.alert').removeClass('d-none')
    }
    reRender(allVideos)

    console.log(allVideos)
})

function reRender(data) {

    $('.videos-list').html(" ");
    let index = 0;
    data.map(obj => {
        let card = `
           <div class='card-item mx-3 my-3'>
               <div class='action'>
                  <div class='action_item'>
                     <i onclick='deleter(${index})' class="fa-solid fa-trash-can"></i>
                      <button class='btn btn-danger'></button>
                  </div>
                  <div class='action_item'>
                      <i onclick='editer(${index})' data-bs-toggle="modal" data-bs-target="#exampleModal" class="fa-solid fa-file-pen"></i>
                      <button class='btn btn-secondary'></button>
                  </div>
               </div>

               <iframe width="350" height="250" src="${obj.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
               <p>${obj.name}<p>
           </div>
        `
        $('.videos-list').append(card)

        index++
    })

}
reRender(allVideos)

function deleter(index) {
    allVideos.splice(index, 1);

    reRender(allVideos)
}

let currentIndex

function editer(index) {
    currentIndex = index
    $('.url-edit').val(allVideos[index].url)
    $('.name-edit').val(allVideos[index].name)
}

function saveEdits() {
    allVideos[currentIndex].url = $('.url-edit').val().replace('youtu.be', 'www.youtube.com/embed')
    allVideos[currentIndex].name = $('.name-edit').val().replace('youtu.be', 'www.youtube.com/embed')

    reRender(allVideos)
}

function searchVideos(val) {
    let searchVideos = allVideos.filter(obj => {
        return obj.name.toLowerCase().includes(val.value.toLowerCase())
    })

    reRender(searchVideos)
}