window.onhashchange = function () {
    let path = location.hash.substring(1);
    document.title = `Directory Listing: ${path}`;
    $('h1').text(`Index of ${path}`);
    $('tbody').empty().append($('<tr></tr>')
        .append($('<th></th>').text('Type'))
        .append($('<th></th>').text('Name'))
        .append($('<th></th>').text('Size'))
        .append($('<th></th>').text('SHA'))
    ).ready(function () {
        $.get(`https://api.github.com/repos/xgugugu/xgugugu.github.io/contents${path}`, function (json, status) {
            if (status == 'success') {
                if (path != '/') {
                    $('tbody').append($('<tr></tr>')
                        .append($('<td></td>')
                            .text('dir')
                        )
                        .append($('<td></td>')
                            .append($('<a></a>')
                                .attr('href', `/#/${0, path.substring(path.lastIndexOf('/') + 1)}`)
                                .text('..')
                            )
                        )
                        .append($('<td></td>'))
                        .append($('<td></td>'))
                    );
                }
                for (let i in json) {
                    $('tbody').append($('<tr></tr>')
                        .append($('<td></td>')
                            .text(json[i].type)
                        )
                        .append($('<td></td>')
                            .append($('<a></a>')
                                .attr('href', (function () {
                                    if (json[i].type == 'file') {
                                        return `https://xgugugu.github.io/${json[i].path}`;
                                    } else {
                                        return `/#/${json[i].path}/`;
                                    }
                                })())
                                .text(json[i].name)
                            )
                        )
                        .append($('<td></td>')
                            .text((function () {
                                if (json[i].size != 0) {
                                    return json[i].size;
                                } else {
                                    return '';
                                }
                            })())
                        )
                        .append($('<td></td>')
                            .text(json[i].sha)
                        )
                    )
                }
            } else {
                $('tbody').append($('<tr></tr>')
                    .append($('<td></td>').text(`Github API Error.`))
                )
            }
        });
    });
}
if (location.hash == '') {
    location.hash = '#/';
} else {
    window.onhashchange();
}