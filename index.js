document.title = 'OI题 - Xgugugu';
let json = [], search = '';
function refresh() {
    $('#list').empty();
    for (let i in json) {
        let content = json[i].tag_name + ' ' + json[i].name + '\n\n' + marked.parse(json[i].body);
        if (content.search(search) != -1) {
            $('#list').append($('<div></div>')
                .attr('class', 'ui item')
                .append($('<div></div>')
                    .attr('class', 'content')
                    .append($('<a></a>')
                        .attr('class', 'header')
                        .attr('click_id', i)
                        .text(`${json[i].tag_name} ${json[i].name}`)
                        .click(function () {
                            $('#problem').empty();
                            $('#button').empty();
                            let problem = json[$(this).attr('click_id')];
                            $('#problem').html(marked.parse(problem.body));
                            $('#button')
                                .append($('<div></div>')
                                    .attr('class', 'ui segment')
                                    .html('<strong>题解</strong>')
                                    .append($('<div></div>')
                                        .attr('class', 'ui cards')
                                        .attr('id', 'ans')
                                        .ready(function () {
                                            marked.setOptions({
                                                highlight: function (code) {
                                                    return hljs.highlightAuto(code).value;
                                                }
                                            });
                                            let ans = $('#ans').removeAttr('id');
                                            $.get('https://api.github.com/repos/xgugugu/problem/issues?state=open', function (body, status) {
                                                for (let i in body) {
                                                    if (body[i].title == problem.tag_name) {
                                                        ans.append($('<div></div>')
                                                            .attr('class', 'ui card')
                                                            .append($('<div></div>')
                                                                .attr('class', 'ui content')
                                                                .html(marked.parse(body[i].body))
                                                            )
                                                        );
                                                    }
                                                }
                                                $('pre').attr('style', 'white-space: pre-wrap!important;');
                                            });
                                        })
                                    )
                                )
                        })
                    )
                )
            );
        }
    }
}
$('body').append($('<div></div>')
    .attr('class', 'ui segment')
    .css('margin', '5%')
    .append($('<div></div>')
        .attr('class', 'ui large grid')
        .append($('<div></div>')
            .attr('class', 'three wide column')
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
            .append($('<div></div>')
                .attr('class', 'ui large relaxed divided list')
                .attr('id', 'list')
                .ready(function () {
                    $.get('https://api.github.com/repos/xgugugu/problem/releases', function (body, status) {
                        json = body;
                        json.sort(function (x, y) {
                            return x.tag_name - y.tag_name;
                        });
                        refresh();
                    })
                })
            )
        )
        .append($('<div></div>')
            .attr('class', 'nine wide column')
            .attr('id', 'problem')
        )
        .append($('<div></div>')
            .attr('class', 'four wide column')
            .attr('id', 'button')
        )
    )
)