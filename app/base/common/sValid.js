/**
 * @fileOverview sValid,验证
 *
 */
define(function() {
    $.extend($, {
        sValid: function(validelement) {
            var $this = $.sValid;
            var sElement = $this.settings.sElement;
            for (var i = 0; i < sElement.length; i++) {
                var element = sElement[i];
                var sEl = $("#" + element).length > 0 ? $("#" + element) : $("." + element);
                for (var j = 0; j < sEl.length; j++) {
                    /* 兼容只验证某个元素 ccw*/
                    if (typeof validelement !== "undefined") {
                        if (sEl[0] === validelement[0]) {
                            $this.check(element, sEl[j]);
                        }
                    } else {
                        $this.check(element, sEl[j]);
                    }
                }
            }
            $this.callBackData();
            var cEid = $this.errorFiles.eId;
            var cEmsg = $this.errorFiles.eMsg;
            var cErules = $this.errorFiles.eRules;
            var isVlided = false;
            if (cEid.length > 0) {
                isVlided = false;
            } else {
                isVlided = true;
            }
            $this.settings.callback.apply(this, [cEid, cEmsg, cErules]);
            $this.destroyData();
            return isVlided;
        }
    });
    //sValid
    $.extend($.sValid, {
        defaults: {
            rules: {},
            messages: {},
            callback: function() {}
        },
        init: function(options) {
            //初始化控件参数
            var opt = $.extend({}, this.defaults, options);
            var rules = opt.rules;
            var messages = opt.messages;
            var sElement = [];
            $.map(rules, function(item, idx) {
                sElement.push(idx);
            });
            this.settings = {};
            this.settings["sElement"] = sElement;
            this.settings["sRules"] = rules;
            this.settings["sMessages"] = messages;
            this.settings['callback'] = opt.callback;
        },
        optional: function(element) {
            var val = this.elementValue(element);
            return !this.methods.required.call(this, val, element);
        },
        methods: {
            required: function(value, element) {
                if (element.nodeName.toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                return $.trim(value).length > 0;
            },
            maxlength: function(value, element, param) {
                var length = $.trim(value).length;
                return this.optional(element) || length <= param;
            },
            minlength: function(value, element, param) {
                var length = $.trim(value).length;
                return this.optional(element) || length >= param;
            },
            //是否是合法数字（包括正数、负数）
            number: function(value, element, param) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function(value, element, param) {
                return this.optional(element) || /^\d+$/.test(value);
            },
            email: function(value, element, param) {
                return this.optional(element) || /^[a-z0-9-]{1,30}@[a-z0-9-]{1,65}(\.[a-z0-9-]{1,65})*$/.test(value);
            },
            /*
               手机
               by ccw
            */
            phone: function (value, element, param) {
                return this.optional(element) || /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(value);
            },
            /*
               密码由8-20位字符组成，要求数字、字母和符号两种以上组合
               by ccw
            */
            password: function (value, element, param) {

                return this.optional(element) || /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/.test(value);
            },
            /*
               邮箱手机
               by ccw
            */
            emailphone: function (value, element, param) {
                return this.optional(element) || (/^[a-z0-9-]{1,30}@[a-z0-9-]{1,65}(\.[a-z0-9-]{1,65})*$/.test(value) || /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(value));
            },
            /*
               电话号码
               by LJL
            */
            telephone: function(value, element, param){
                return this.optional(element) || /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(value);
            },
            /*
                验证两次密码(不太灵活)
                by LJL
             */
            equalTo:function(value, element, param){
                if($('#retPassword').val() != $('#retPasswordOk').val()){
                    return false;
                }else{
                    return true;
                }
            },
            /*
                验证身份证
            */
            isIdCardNo:function(value, element, param){
                return this.optional(element) || isIdCardNo(value);
            },
            /*
                身份证姓名
            */
            chcharacter: function(value, element, param){
                var name = /^[\u4E00-\u9FA5]+$/;
                return this.optional(element) || (name.test(value));
            },
            /*
                银行卡简易版
            */
            bankCard: function(value, element, param){
                // var value = value.replace(/\s/g,'');
                // var regx = /^(\d{16}|\d{19})$/;
                // return this.optional(element) || (regx.test(value));

                //http://cdn.jsdelivr.net/jquery.validation/1.14.0/jquery.validate.js
                if ( this.optional( element ) ) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if ( /[^0-9 \-]+/.test( value ) ) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n, cDigit;

                value = value.replace( /\D/g, "" );

                // Basing min and max length on
                // http://developer.ean.com/general_info/Valid_Credit_Card_Types
                if ( value.length < 16 || value.length > 19 ) {
                    return false;
                }

                for ( n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt( n );
                    nDigit = parseInt( cDigit, 10 );
                    if ( bEven ) {
                        if ( ( nDigit *= 2 ) > 9 ) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return ( nCheck % 10 ) === 0;
            }
        },
        elementValue: function(element) {
            var type = $(element).attr("type");
            var value = $(element).val();
            if (typeof value === "string") {
                return value.replace(/\r/g, "");
            }
            return value;
        },
        rulesFormat: {
            required: true,
            email: true
        },
        errorFiles: {
            eId: [],
            eRules: {},
            eMsg: {}
        },
        check: function(element, mEl) {
            var settingsRules = [];
            var methods = this.methods;
            var rules = this.settings["sRules"];
            var mVal = this.elementValue.call(this, mEl);
            var mParam = "";
            var errorFiles = this.errorFiles;
            var errRules = [];
            //rules
            if (typeof rules[element] === "string") {
                if ($.inArray(rules[element], settingsRules) < 0) {
                    settingsRules.push(rules[element]);
                }
            } else {
                $.each(rules[element], function(idx, item) {
                    if ($.inArray(idx, settingsRules) < 0) {
                        settingsRules.push(idx);
                        if (idx == "maxlength" || idx == "minlength") {
                            mParam = parseInt(item);
                        }
                    }
                });
            }
            //checked
            for (var i = 0; i < settingsRules.length; i++) {
                if (!methods[settingsRules[i]].call(this, mVal, mEl, mParam)) {
                    errRules.push(settingsRules[i]);
                    errorFiles['eRules'][element] = errRules;
                    if ($.inArray(element, errorFiles['eId']) < 0) {
                        errorFiles['eId'].push(element);
                    }
                }
            }
        },
        callBackData: function() {
            var errorFiles = this.errorFiles;
            var errId = errorFiles.eId;
            var eMsg = errorFiles.eMsg;
            var eRules = errorFiles.eRules;
            var sMessages = this.settings.sMessages;
            for (var i = 0; i < errId.length; i++) {
                if (typeof sMessages[errId[i]] === "string") {
                    eMsg[errId[i] + "_" + eRules[errId[i]]] = sMessages[errId[i]];
                } else {
                    if ($.isArray(eRules[errId[i]])) {
                        for (var j = 0; j < eRules[errId[i]].length; j++) {
                            eMsg[errId[i] + "_" + eRules[errId[i]][j]] = sMessages[errId[i]][eRules[errId[i]][j]];
                        }
                    }
                }
            }
        },
        destroyData: function() {
            this.errorFiles = {
                eId: [],
                eRules: {},
                eMsg: {}
            };
        }
    });


    /*身份证验证方法 开始 */
        /*去掉字符串头尾空格*/
        function trim(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }

        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];                  // 身份证验证位值.10代表X
        function isIdCardNo(idCard) {
            idCard = trim(idCard.replace(/ /g, ""));                            //去掉字符串头尾空格
            if (idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard);                       //进行15位身份证的验证
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split("");                                // 得到身份证数组
                if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
                    return true;
                }else {
                    return false;
                }
            } else {
                return false;
            }
        }

        /**
         * 判断身份证号码为18位时最后的验证位是否正确
         * @param a_idCard 身份证号码数组
         * @return
         */
        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0;                                // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10;                      // 将最后位为x的验证码替换为10方便后续操作
            }
            for ( var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i];             // 加权求和
            }
            valCodePosition = sum % 11;                 // 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            } else {
                return false;
            }
        }

        /**
          * 验证18位数身份证号码中的生日是否是有效生日
          * @param idCard 18位书身份证字符串
          * @return
          */
        function isValidityBrithBy18IdCard(idCard18){
            var year =  idCard18.substring(6,10);
            var month = idCard18.substring(10,12);
            var day = idCard18.substring(12,14);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                    return false;
            }else{
                return true;
            }
        }

        /**
         * 验证15位数身份证号码中的生日是否是有效生日
         * @param idCard15 15位书身份证字符串
         * @return
         */
        function isValidityBrithBy15IdCard(idCard15){
            var year =  idCard15.substring(6,8);
            var month = idCard15.substring(8,10);
            var day = idCard15.substring(10,12);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                      return false;
              }else{
                  return true;
              }
        }
    /* 身份证验证方法 结束 */
});
