<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>发票识别 WebUploader</title>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="css/webuploader.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <style>
        .demo {
            min-width: 360px;
            margin: 30px auto;
            padding: 10px 20px
        }

        .demo h3 {
            line-height: 40px;
            font-weight: bold;
        }

        .file-item {
            float: left;
            position: relative;
            width: 110px;
            height: 110px;
            margin: 0 20px 20px 0;
            padding: 4px;
        }

        .file-item .info {
            overflow: hidden;
        }

        .uploader-list {
            width: 100%;
            overflow: hidden;
        }

        #upbtn {
            position: absolute;
            top: 20px;
            left: 458px;
            width: 168px;
            height: 44px;
            overflow: hidden;
            bottom: auto;
            right: auto;
        }

        #upbtn input {
            display: block;
            width: 258px;
            height: 100%;
            cursor: pointer;
            margin-left: -90px;
            opacity: 0;
        }

        #log_window {
            width: 960px;
            background-color: #666;
            z-index: 3;
            display: none;
            margin-top: 100px;
            margin-left: 100px;
        }

        #log_window a {
            color: #000;
            position: absolute;
            margin-top: -580px;
            margin-left: 430px;
        }
    </style>

    <script language="javascript">
        document.write("<l" + "ink rel='stylesheet' type='text/css' href='css/common.css' />");
    </script>
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/ajaxfileupload.js"></script>

</head>
<body>
<div class="container">

    <div class="row main">
        <div class="demo">
            <div class="logo vt-home">
                <img src="imgs/logo.png" height="80" class="vt-home">
                <span class="library">四川大学发票识别平台</span>
            </div>
            <p class="about vt-home">支持增值税专用发票、增值税普通发票（含电子普通发票、卷式发票）、机动车销售统一发票、货物运输业增值税专用发票在线查验</p>
        </div>
        <div class="demo">
            <div id="uploader">
                <div class="queueList">
                        <div id="dndArea" class="placeholder">
                                <img alt="Click to select a file" class="vt-upload-form" src="imgs/thumbprint.png">

                                <div id="filePicker" class="webuploader-container">
                                    <div class="webuploader-pick">点击选择图片</div>
                                    <div id="upbtn">
                                        <input type="file" name="imgfile" id="imgfile" onchange="ajaxFileUpload()">
                                    </div>
                                </div>
                        </div>
                </div>
                <div class="statusBar" style="display:none;">
                    <div class="progress">
                        <span class="text">0%</span>
                        <span class="percentage"></span>
                    </div>
                    <div class="info"></div>
                    <div class="btns">
                        <div id="filePicker2"></div>
                        <div class="uploadBtn">开始上传</div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div id="log_window"><%@ include file="result.jsp" %></div>

</div>


<script type="text/javascript">

    function ajaxFileUpload() {
        $.ajaxFileUpload
        (
            {
                url:'uploadimg.action',//用于文件上传的服务器端请求地址
                secureuri:false,//一般设置为false
                fileElementId:'imgfile',//文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType:'json',//返回值类型 一般设置为json
                success: function (data, status)  //服务器成功响应处理函数
                {
//                  var d = eval("("+data+")");//将数据转换成json类型，可以把data用alert()输出出来看看到底是什么样的结构
                    var jsondata = JSON.parse(data);   //把json字符串转化为json对象，才能用j.name取值
                    var fplx = getfplx(jsondata.code);
                    if (fplx == "火车票") {
//                        alert("火车票: \n"+data);
                        $("#log_window").css('display', 'block');
                        //查验时间
                        $('#cysj').text("查验时间：" + jsondata.Goods[0].time);
                        $('#fpcc_zp').text(fplx);
                        $('#tabPage-zzszyfp').append('<div style="width: 100%; word-break: break-all";>' + data + '</div>');
                        $('#tabPage-zzszyfp table').css('display', 'none')
                        $('.main').css('display', 'none');
                        $('body').css('background-color', '#666');
                        return 0;
                    }
                    var ip = getip(jsondata.code);
                    $("#log_window").css('display','block');
                    //查验时间
                    $('#cysj').text("查验时间："+jsondata.Goods[0].time);
                    $('#fpcc_zp').text(ip + fplx);
                    //发票号码
                    $('#fpdm_zp').text(jsondata.code);
                    $('#fphm_zp').text(jsondata.num);
                    $('#kprq_zp').text(jsondata.date);
                    $('#jym_zp').text(jsondata.check_code);
                    //购买方
                    $('#gfmc_zp').text(jsondata.buy_name);
                    $('#gfsbh_zp').text(jsondata.buy_data[0].buy_code);
                    $('#gfdz_zp').text(jsondata.buy_data[0].buy_address);
                    $('#gfdh_zp').text(jsondata.buy_data[0].buy_tel);
                    $('#gfyh_zp').text(jsondata.buy_data[0].buy_bank);
                    $('#gfzh_zp').text(jsondata.buy_data[0].buy_bank_no);
                    //销售方
                    $('#xfmc_zp').text(jsondata.sell_name);
                    $('#xfsbh_zp').text(jsondata.sell_data[0].sell_code);
                    $('#xfdz_zp').text(jsondata.sell_data[0].sell_address);
                    $('#xfdh_zp').text(jsondata.sell_data[0].sell_tel);
                    $('#xfyh_zp').text(jsondata.sell_data[0].sell_bank);
                    $('#xfzh_zp').text(jsondata.sell_data[0].sell_bank_no);

                    var tb = $(".fppy_table_box");
                    for (var item in jsondata.Goods) {
                        $(".fppy_table_box").append( '<tr><td class="align_center borderRight borderTop"><span class="content_td_blue" id="goodsname">'+
                            jsondata.Goods[item].goodsname +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="specification">'+
                            jsondata.Goods[item].specification +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="unit">'+
                            jsondata.Goods[item].unit +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="Amount">'+
                            jsondata.Goods[item].amount +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="unit_price">'+
                            jsondata.Goods[item].unit_price +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="pretax_price">'+
                            jsondata.Goods[item].pretax_price +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="tax">'+
                            jsondata.Goods[item].tax +
                            '</span></td><td class="align_center borderRight borderTop"><span class="content_td_blue" id="tax_price">'+
                            jsondata.Goods[item].tax_price +
                            '</span></td></tr>'  );
                    }

                    //合计
                    $(".fppy_table_box").append( '<tr><td class="align_center borderRight borderTop">合计</td>' +
                        '<td colspan="7" class="align_left borderTop"><span class="content_td_blue" id="jshjdx_zp">'+
                        jsondata.price+
                        '</span></td></tr>' );

                    $('.main').css('display','none');
                    $('body').css('background-color','#666')
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
//                    alert("data: "+data+";\n"+"status: "+status+";\n"+"exp: "+e);
                    alert("识别失败！请尝试重新上传。。。");
                    window.location.reload();
                }
            }
        )
    }

    function cancel_shield() {
        var l = document.getElementById("log_window");
        l.style.display = "none";
        window.location.reload(true);
    }

    function getfplx(fpdm) {
        var fplx = "99";
        var value = "";
        var code = new Array("144031539110", "131001570151", "133011501118", "111001571071");
        if (typeof fpdm != "undefined" && fpdm) {
            var a = fpdm.charAt(7);
            if (fpdm.length == 10) {
                if (a == '1' || a == '5') {
                    fplx = "01";
                    value = "增值税专用发票"
                }
                else if (a == '3' || a == '6') {
                    fplx = "04";
                    value = "增值税普通发票"
                }
                else if (a == '2' || a == '7') {
                    fplx = "02";
                    value = "货物运输业增值税专用发票"
                } else if (a == '9') {
                    fplx = "9999";
                    value = "火车票"
                }
            }
            else {
                for (var i in code) {
                    if (fpdm == code[i]) {
                        fplx = "10";
                        value = "增值税电子普通发票"
                        break;
                    }
                }
                if (fplx.equals("99")) {
                    if (fpdm.charAt(0) == '0' && fpdm.substring(10, 12) == "11") {
                        fplx = "10";
                        value = "增值税电子普通发票"
                    }
                    else if (fpdm.charAt(0) == '0' && (fpdm.substring(10, 12) == "06" || fpdm.substring(10, 12) == "07")) {
                        fplx = "11";
                        value = "增值税普通发票（卷票）"
                    }
                    else if ((fpdm.charAt(0) != '0') && a == '2') {
                        fplx = "03";
                        value = "机动车销售统一发票"
                    }
                }
            }
        }
        return value;
    }

    function getip(fpdm) {
        var iparr = [["1100", "北京市"], ["1200", "天津市"],
            ["1300", "河北省"], ["1400", "山西省"], ["1500", "内蒙古自治区"],
            ["2100", "辽宁省"], ["2102", "大连市"], ["2200", "吉林省"],
            ["2300", "黑龙江省"], ["3100", "上海市"], ["3200", "江苏省"],
            ["3300", "浙江省"], ["3302", "宁波市"], ["3400", "安徽省"],
            ["3500", "福建省"], ["3502", "厦门市"], ["3600", "江西省"],
            ["3700", "山东省"], ["3702", "青岛市"], ["4100", "河南省"],
            ["4200", "湖北省"], ["4300", "湖南省"], ["4400", "广东省"],
            ["4403", "深圳市"], ["4500", "广西"], ["4600", "海南省"],
            ["5000", "重庆市"], ["5100", "四川省"],
            ["5200", "贵州省"], ["5300", "云南省"], ["5400", "西藏"],
            ["6100", "陕西省"], ["6200", "甘肃省"], ["6300", "青海省"],
            ["6400", "宁夏"], ["6500", "新疆"]];
        var ip = null;
        var dqdm = null;
        if (fpdm.length == 12) {
            dqdm = fpdm.substring(1, 5);
        } else {
            dqdm = fpdm.substring(0, 4);
        }
        if ((dqdm != "2102") && (dqdm != "3302") && (dqdm != "3502") && (dqdm != "3702") && (dqdm != "4403")) {
            dqdm = dqdm.substring(0, 2) + "00";
        }
        for (var i = 0; i < 36; i++) {
            if (dqdm == (iparr[i][0])) {
                ip = iparr[i][1];
                break;
            }
        }
        return ip;
    }

</script>
</body>
</html>
