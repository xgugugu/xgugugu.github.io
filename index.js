(window.onhashchange = function () {
    switch (location.hash) {
        case '':
            $('body').html('');
            location.hash = '#/home';
            break;
        case '#/home':
            $('body').html('');
            home();
            break;
        case '#/blog':
            $('body').html('');
            blog();
            break;
        case '#/blogSub':
            $('body').html('');
            blogSub();
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
            .css({ 'margin-top': '2%', 'margin-left': '8%', 'margin-right': '8%' })
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
            .css({ 'margin-top': '5%', 'margin-left': '12%', 'margin-right': '12%' })
            .append($('<div></div>')
                .attr('class', 'ui two column very relaxed grid')
                .append($('<img></img>')
                    .attr('class', 'ui small bordered image')
                    .css('padding', '0px')
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
                                .html(`${json.bio}<br>Live in ${json.location}`)
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
            .append($('<div></div>')

            )
        );
}

function blog() {
    document.title = '文章 - Xgugugu';
    let blogs = [], search = '';
    function refresh() {
        let list = $('#list').empty();
        for (let i in blogs) {
            let content = blogs[i].title + '\n\n' + marked.parse(blogs[i].body);
            if (content.search(search) != -1) {
                list.append($('<div></div>')
                    .attr('class', 'item')
                    .append($('<div></div>')
                        .attr('class', 'content')
                        .append($('<p></p>')
                            .append($('<a></a>')
                                .attr('class', 'ui medium header')
                                .attr('click_id', blogs[i].number)
                                .css('float', 'left')
                                .text(blogs[i].title)
                                .click(function () {
                                    window.open(`/#/blogSub?id=${$(this).attr('click_id')}`)
                                })
                            )
                            .append($('<span></span>')
                                .attr('class', 'ui small text')
                                .css('margin-left', '20px')
                                .text(`#${blogs[i].number}`)
                            )
                            .append($('<em></em>')
                                .css('float', 'right')
                                .text('By xgugugu')
                            )
                        )
                        .append($('<div></div>')
                            .attr('class', 'description')
                            .text(`Updated at ${new Date(blogs[i].updated_at).toLocaleString()}`)
                        )
                    )
                );
            }
        }
    }
    $('body')
        .append($('<div></div>')
            .attr('class', 'ui large pointing menu')
            .css({ 'margin-top': '2%', 'margin-left': '8%', 'margin-right': '8%' })
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
                    .append($('<div></div>')
                        .attr('class', 'ui transparent icon input')
                        .append($('<input></input>')
                            .attr('class', 'prompt')
                            .attr('type', 'text')
                            .attr('placeholder', '搜索...')
                            .bind('input', function () {
                                search = $(this).val();
                                refresh();
                            })
                        )
                    )
                )
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
            .attr('class', 'ui segment')
            .css({ 'margin-top': '5%', 'margin-left': '12%', 'margin-right': '12%' })
            .append($('<div></div>')
                .attr('class', 'ui large relaxed divided list')
                .attr('id', 'list')
                .ready(function () {
                    $.get('https://api.github.com/repos/xgugugu/xgugugu.github.io/issues?creator=xgugugu&state=open&per_page=10000&page=1', function (json, status) {
                        blogs = json;
                        blogs.sort(function (x, y) {
                            return Date.parse(y.updated_at) - Date.parse(x.updated_at);
                        });
                        refresh();
                    });
                })
            )
        )
}

function blogSub() {
    document.write(location.search);
}