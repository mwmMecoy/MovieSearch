$(document).ready(function() {
    $(`title`).autocomplete({
        source: async function(request, response) {
            let data = await fetch(`http://localhost:8000/search?query=${request.term}`)
                        .then(results => results.json())
                        .then(results => results.map(result => {
                            return {
                                label: result.title,
                                value: result.title,
                                id: results._id
                            }
                        }))
                    response(data)
        },
        minLength: 2,
        //setting up the abiliy to make a selection
        select: function(event, ui) {
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    $(`#cast`).empty()
                })
        }
    })
})