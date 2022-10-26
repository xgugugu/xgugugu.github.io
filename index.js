function jump(hash) {
    location.hash = '#/home';
}

(window.onhashchange = function () {
    switch (location.hash) {
        case '':
            $('body').html('');
            jump('#/home');
            break;
        case '#/home':
            $('body').html('');
            home();
            break;
        case '#/blog':
            $('body').html('');
            blog();
            break;
        default:
            $('body').html('');
            jump('#/home');
            break;
    }
})();

function home() {
    document.title = '主页 - Xgugugu';
    $('body')
        .append($('<div></div>')
            .attr('class', 'ui large pointing menu')
            .append($('<a></a>')
                .attr('class', 'active item')
                .click(function () {
                    location.hash = '#/home';
                })
                .text('主页')
            )
            .append($('<a></a>')
                .attr('class', 'item')
                .click(function () {
                    location.hash = '#/blog';
                })
                .text('文章')
            )
            .append($('<div></div>')
                .attr('class', 'right menu')
                .append($('<div></div>')
                    .attr('class', 'item')
                    .append($('<button></button>')
                        .attr('class', 'ui button')
                        .click(function () {
                            location.href = 'https://github.com/xgugugu/';
                        })
                        .text('Github')
                    )
                )
            )
        )
        .append($('<div></div>')
            .attr('class', 'ui large segment')
            .css({ 'margin-top': '5%', 'margin-left': '10%', 'margin-right': '10%' })
            .append($('<div></div>')
                .attr('class', 'ui two column very relaxed grid')
                .append($('<img></img>')
                    .attr('class', 'ui small bordered image')
                    .attr('src', 'https://avatars.githubusercontent.com/u/85472190?v=4')
                )
                .append($('<div></div>')
                    .attr('class', 'column')
                    .attr('id', 'my')
                    .append($('<p></p>')
                        .text('Loading...')
                    )
                )
                .ready(function () {
                    $.get('https://api.github.com/users/xgugugu', function (json, status) {
                        $('#my').empty()
                            .append($('<p></p>')
                                .append($('<span></span>')
                                    .attr('class', 'ui large text')
                                    .text('Xgugugu')
                                )
                            )
                            .append($('<p></p>')
                                .text(`${json.bio}\nLive in ${json.location}`)
                            )
                            .append($('<p></p>')
                                .text(`${json.public_repos} repositories · ${json.followers} followers · ${json.following} followings`)
                            )
                            .removeAttr('id');
                    });
                })
            )
        )
        .append($('<div></div>')
            .attr('class', 'ui large segment')
            .css({ 'margin-top': '3%', 'margin-left': '10%', 'margin-right': '10%' })
            .append($('<p></p>')
                .append($('<strong></strong>')
                    .append($('<span></span>')
                        .attr('class', 'ui large text')
                        .text('欢迎来到 Xgugugu\' pages')
                    )
                )
            )
        );
}

function blog() {
    document.title = '文章 - Xgugugu';
    $('body')
        .append($('<div></div>')
            .attr('class', 'ui large pointing menu')
            .append($('<a></a>')
                .attr('class', 'item')
                .click(function () {
                    location.hash = '#/home';
                })
                .text('主页')
            )
            .append($('<a></a>')
                .attr('class', 'active item')
                .click(function () {
                    location.hash = '#/blog';
                })
                .text('文章')
            )
            .append($('<div></div>')
                .attr('class', 'right menu')
                .append($('<div></div>')
                    .attr('class', 'item')
                    .append($('<button></button>')
                        .attr('class', 'ui button')
                        .click(function () {
                            location.href = 'https://github.com/xgugugu/';
                        })
                        .text('Github')
                    )
                )
            )
        )
}