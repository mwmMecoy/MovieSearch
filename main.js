$(document).ready(function() {
    $(`title`).autocomplete({
        source: async function(request, response) {
            let data = await fetch(`http://localhost:8000/search?query=${request.term}`)
        }
    })
})