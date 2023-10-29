function protocolDetails() {
  let MainForm = document.getElementById('MainDetails')
  let protocol = MainForm.elements.protocol.value
  let transmission = MainForm.elements.transmission.value
  let security = MainForm.elements.security.value
  let headertype = document.getElementById('header').value
  let path = document.getElementById('path').value
  var sniffing = document.getElementById('sniffing').checked;
  var destOverride = "";
  var sniftext = '';
  var checkboxes = document.querySelectorAll('.group-checkbox');
  var transmissions = document.getElementById("transmissions");
  var idsecurity = document.getElementById("idsecurity");



  var securitySelect = document.querySelector('select[name="security"]');
  var shadowNetworks = document.getElementById("shadowNetworks");




  function sniffingconfig(config) {
    if (config == true) {
      document.getElementById("sniffingDiv").style.display = "block";

      document.getElementById("SniffingCheckbox").style.display = "block";
      function updateSelectedOptions() {
        var selectedOptions = [];

        checkboxes.forEach(function (checkbox) {
          if (checkbox.checked) {
            selectedOptions.push('"' + checkbox.name + '"');

          }
        });

        if (selectedOptions.length > 0) {
          destOverride = selectedOptions.join(', ');


        } else {
          destOverride = selectedOptions;

        }
        if (destOverride == '') {
          // alert("ddd");
          document.getElementById('sniffing').checked = false;
          checkboxes.forEach(function (checkbox) {
            checkbox.checked = true; // اگر دکمه sniffing فعال شود، تمام چک باکس‌ها را فعال کنید.
          });
          document.getElementById("SniffingCheckbox").style.display = "none";
          sniffing = false;
          //offsniftext();


        }
        return destOverride;

      }

      return updateSelectedOptions();
    }
    if (!config) {
      document.getElementById("SniffingCheckbox").style.display = "none";
      return '';


    }
  }
  sniftext = `,
  "sniffing": {
      "enabled": true,
      "destOverride": [${sniffingconfig(sniffing)}]
  }`;


  const protocolMapping = {
    vless: 1,
    vmess: 2,
    trojan: 5,
    shadowsocks: 9
  }
  const transsportMapping = {
    tcp: 1,
    ws: 2,
    grpc: 5,
    tcpudp: 7,
    tcpS: 8,
    udpS: 9
  }
  const securityMapping = {
    tls: 1,
    xtls: 2,
    reality: 5,
    none: 0
  }
  const headerMapping = {
    None: 0,
    http: 1
  }

  var p = protocolMapping[protocol]
  var t = transsportMapping[transmission]
  var s = securityMapping[security]
  var h = headerMapping[headertype]
  var pt = p.toString() + t.toString()
  var pts = p.toString() + t.toString() + s.toString()

  //دریافت متغیر های فرم ها

  let port = document.getElementById('port').value;
  let name = document.getElementById('inboundname').value

  const button = document.getElementById("random");



  let pubkey = document.getElementById('pubkey').value
  let pvkey = document.getElementById('pvkey').value
  let sni = document
    .getElementById('sni')
    .value.replace(/(http:\/\/|https:\/\/|\/)/g, '')

  var acceptProxyProtocol = document.getElementById(
    'acceptProxyProtocol'
  ).checked;
  var headerOnOff = document.getElementById('headerOnOff').checked
  h == 0
    ? (document.getElementById('headerOnOffDiv').style.display = 'none')
    : (document.getElementById('headerOnOffDiv').style.display = 'block')

  t == 5
    ? (document.getElementById('acceptProxyProtocols').style.display = 'none')
    : (document.getElementById('acceptProxyProtocols').style.display = 'block')
  headerOnOff == true
    ? (document.getElementById('sarbarg').style.display = 'block')
    : (document.getElementById('sarbarg').style.display = 'none')
  if (h == 0) {
    headerOnOff = false

  }
  else {

    headerOnOff = document.getElementById('headerOnOff').checked;

  }
  var userdest = document.getElementById('dest').value;

  var dest = userdest.includes(":443") ? userdest : userdest + ":443";

  let ServerNames = document.getElementById('ServerNames').value
  let ShortIds = document.getElementById('ShortIds').value
  let SpiderX = document.getElementById('SpiderX').value
  let PublicKey = document.getElementById('PublicKey').value
  let PrivateKey = document.getElementById('PrivateKey').value
  // let tls = document.getElementById("tLS");
  let publickeyStatus = document.getElementById('publickeyStatusOnOff').checked
  publickeyStatus == true
    ? (document.getElementById('PublicKeyDiv').style.display = 'block')
    : (document.getElementById('PublicKeyDiv').style.display = 'none')
  let TlsForm = document.getElementById('Tls')
  let RealityForm = document.getElementById('RealityForm')
  //نمایان شدن یا نشدن بخش هدر تایپ

  document.getElementById('protocolDetails').style.display = 'block'
  document.getElementById('divheader').style.display =
    t === 5 ? 'none' : 'block';
  document.getElementById('http_header_Fields').style.display =
    h === 0 ? 'none' : 'block';


  if (acceptProxyProtocol) {

    acceptProxyProtocol = `
          "acceptProxyProtocol": true,`;

  }
  else {

    acceptProxyProtocol = '';
  }
  //نمایان شدن کانفیگ ها در کنار هم

  if (p == 9) {
    idsecurity.style.display = "none";
    document.getElementById("NetWorks").style.display = "block";
    transmissions.style.display = "none";
    var network = document.getElementById("network").value;
    BuildShadow(network, name, port);


  }
  else {
    document.getElementById("NetWorks").style.display = "none";
    transmissions.style.display = "block";
    idsecurity.style.display = "block";

    transmission.innerHTML = `<div id="transmissions">
    <label for="transmission">Transmission</label>
    <select name="transmission" id="transmission" >
        <option value="tcp">tcp</option>
        <option value="ws">ws</option>
        <option value="grpc">grpc</option>
    </select>
</div>`;
    if (pt == 11 || pt == 15 || pt == 51) {

      if (pt == 11) {
        console.log(pt);


        // محتوای جدیدی که می‌خواهید جایگزین شود
        var newText1 = `<div id="idsecurity">
          <label for="security">Security</label>
          <select name="security" >
              <option value="none">none</option>
              <option value="tls" id="tls">tls</option>
              <option value="xtls" id="xtls">xtls</option>
              <option value="reality" id="reality">reality</option>
          </select>
      </div>`;

        // جایگزینی محتوای عنصر با متن جدید

        idsecurity.innerHTML = newText1;
        document.querySelector('select[name="security"]').value = security;


      }
      else if (pt == 15) {


        // محتوای جدیدی که می‌خواهید جایگزین شود
        var newText2 = `<div id="idsecurity">
      <label for="security">Security</label>
      <select name="security" >
          <option value="none">none</option>
          <option value="tls" id="tls">tls</option>
          <option value="reality" id="reality">reality</option>
      </select>
  </div>`;

        // جایگزینی محتوای عنصر با متن جدید
        idsecurity.innerHTML = newText2;

        document.querySelector('select[name="security"]').value = security;
      }
      else {



        // محتوای جدیدی که می‌خواهید جایگزین شود
        var newText3 = `<div id="idsecurity">
          <label for="security">Security</label>
          <select name="security" >
              <option value="none">none</option>
              <option value="tls" id="tls">tls</option>
              <option value="xtls" id="xtls">xtls</option>
          </select>
      </div>`;

        // جایگزینی محتوای عنصر با متن جدید
        idsecurity.innerHTML = newText3;

        document.querySelector('select[name="security"]').value = security;
      }
    }

    else {


      // محتوای جدیدی که می‌خواهید جایگزین شود
      var newText4 = `<div id="idsecurity">
      <label for="security">Security</label>
      <select name="security" >
          <option value="none">none</option>
          <option value="tls" id="tls">tls</option>
      </select>
  </div>`;

      // جایگزینی محتوای عنصر با متن جدید
      idsecurity.innerHTML = newText4;

      if (security == 'reality' || security == 'xtls') {
        security = 'none'
        protocolDetails();
      }

      document.querySelector('select[name="security"]').value = security;

    }
  }


  //نمایان شدن فیلد های ثانویه
  //کانفیگ های TLS دار

  if (fieldCounter > 0) {
    var fields = document.querySelectorAll('.field')
  }
  if (p != 9) {
    if (s == 1) {
      DisplayBlock(TlsForm, '1')
      DisplayBlock(RealityForm, '0')

      BuildTLS(
        pts,
        t,
        s,
        protocol,
        transmission,
        security,
        name,
        port,
        sni,
        pubkey,
        pvkey,
        h,
        path,
        fields,
        acceptProxyProtocol,
        headerOnOff,
        sniftext,
        sniffing
      )
    }
    if (s == 2) {
      DisplayBlock(TlsForm, '1')
      DisplayBlock(RealityForm, '0')
      BuildTLS(
        pts,
        t,
        s,
        protocol,
        transmission,
        security,
        name,
        port,
        sni,
        pubkey,
        pvkey,
        h,
        path,
        fields,
        acceptProxyProtocol,
        headerOnOff,
        sniftext,
        sniffing
      )
    }
    if (s == 5) {
      DisplayBlock(TlsForm, '0')
      DisplayBlock(RealityForm, '1')
      BuildReality(
        pts,
        t,
        s,
        protocol,
        transmission,
        security,
        name,
        port,
        dest,
        ServerNames,
        ShortIds,
        SpiderX,
        PublicKey,
        PrivateKey,
        h,
        path,
        fields,
        acceptProxyProtocol,
        headerOnOff,
        publickeyStatus,
        sniftext,
        sniffing
      )
    }
    if (s == 0) {
      DisplayBlock(TlsForm, '0')
      DisplayBlock(RealityForm, '0')
      BuildTLS(
        pts,
        t,
        s,
        protocol,
        transmission,
        security,
        name,
        port,
        sni,
        pubkey,
        pvkey,
        h,
        path,
        fields,
        acceptProxyProtocol,
        headerOnOff,
        sniftext,
        sniffing
      )
    }
  }
}

////////////////////////////////////////

const addButton = document.getElementById('addFieldsButton')
const removeButton = document.getElementById('removeFieldsButton')
const targetDiv = document.getElementById('targetDiv')

const dataCollection = [] // آرایه برای جمع‌آوری اطلاعات

var fieldCounter = 0 // شمارنده برای ایجاد شناسه‌های یکتا برای ورودی‌ها
var i = 0
function addFields(event) {
  document.getElementById('removeFieldsButton')
  event.preventDefault()

  const inputContainer = document.createElement('div')
  inputContainer.className = 'input-container'

  const input1 = document.createElement('input')
  input1.type = 'text'
  input1.value = `Host${fieldCounter + 1}`
  input1.id = `field1_${fieldCounter + 1}`
  input1.placeholder = 'فیلد اول'
  input1.classList.add('field') // اضافه کردن کلاس "field" به المان

  const input2 = document.createElement('input')
  input2.type = 'text'
  input2.id = `field2_${fieldCounter + 1}`
  input2.value = 'Xray.com'
  input2.placeholder = 'فیلد دوم'
  input2.classList.add('field') // اضافه کردن کلا
  const hr1 = document.createElement('hr')
  hr1.id = 'hr1'
  inputContainer.appendChild(input1)
  inputContainer.appendChild(input2)
  inputContainer.appendChild(hr1)
  targetDiv.appendChild(inputContainer)

  fieldCounter++ // افزایش شمارنده برای ایجاد شناسه یونیک

  i++
  if (i == fieldCounter && fieldCounter == 0) {
    document.getElementById('removeFieldsButton').style.display = 'none'
  } else {
    document.getElementById('removeFieldsButton').style.display = 'block'
  }
  console.log('########   i   ' + i)
  console.log('###########  count   ' + fieldCounter)
}

function removeFields(event) {
  event.preventDefault()

  const inputContainers = document.querySelectorAll('.input-container')
  if (inputContainers.length > 0) {
    const lastInputContainer = inputContainers[inputContainers.length - 1]
    targetDiv.removeChild(lastInputContainer)
    fieldCounter-- // کاهش شمارنده به ازای حذف یک جفت فیلد
    i--
    if (i == fieldCounter && fieldCounter == 0) {
      document.getElementById('removeFieldsButton').style.display = 'none'
    } else {
      document.getElementById('removeFieldsButton').style.display = 'block'
    }
  }
}

function toggleRemoveButtonVisibility() {
  const inputContainers = document.querySelectorAll('.input-container')
  if (inputContainers.length <= minFields) {
    removeButton.style.display = 'none'
  } else {
    removeButton.style.display = 'block'
  }
}
addButton.addEventListener('click', addFields)
removeButton.addEventListener('click', removeFields)
// هنگامی که اطلاعات وارد شود، اطلاعات به طور مستقیم به آرایه افزوده می‌شوند

/////////////////////////

function DisplayBlock(objectblock, x) {
  x === '0'
    ? (objectblock.style.display = 'none')
    : (objectblock.style.display = 'block')
}

function BuildTLS(
  pts,
  t,
  s,
  protocol,
  transmission,
  security,
  name,
  port,
  sni,
  pubkey,
  pvkey,
  h,
  path,
  fields,
  acceptProxyProtocol,
  headerOnOff,
  sniftext,
  sniffing
) {
  var pts = pts.toString()
  var t = t.toString()
  var s = s.toString()
  var protocol = protocol.toString()
  var transmission = transmission.toString()
  var security = security.toString()
  var tag = name.toString()
  var port = port.toString()
  var sni = sni.toString()
  var pubkey = pubkey.toString()
  var pvkey = pvkey.toString()
  var h = h.toString()
  var n = '\n'
  var acceptProxyProtocol = acceptProxyProtocol.toString();
  var headerOnOff = headerOnOff
  var fields = fields
  var path = path.toString()
  document.getElementById('final').style.display = 'block'
  var final = document.getElementById('final')
  var listen = '"listen": "0.0.0.0",'
  //decryption settings
  var decryptionSettings = '';
  if (pts <= 155) {
    decryptionSettings = `"settings": {
        "clients": [],
        "decryption": "none"
                  },`;

  }
  else {

    decryptionSettings = `"settings": {
        "clients": []
                  },`;


  }



  if (sniffing) {
    sniftext = sniftext;

  }
  else {

    sniftext = '';
  }


  if (h == 1 && fieldCounter > 0 && headerOnOff) {
    if (fields.length > 0) {
      var result = '' // متغیر برای ذخیره نهایی
      var justhosts = ''
      for (
        var k = fields.length + 1 - fields.length - 1;
        k < fields.length;
        k += 2
      ) {
        var key = fields[k].value
        var value = fields[k + 1].value

        // اضافه کردن مقدار template به متغیر result
        result += `"${key}": "${value}"`
        justhosts += `"${value}"`
        // اگر نهایت رشته نیست، یک کاما و یک اینتر (یا خط جدید) اضافه کنید
        if (k < fields.length - 2) {
          result += ',\n'
          justhosts += ','
        }
      }
    }
  }
  if (t == 1) {
    if (h == 0 && headerOnOff == false) {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
          "header": {
          "type": "none"
      }
    },`
    } else if (h == 1 && headerOnOff == false) {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
      "header": {
      "type": "http",
      "request": {
      "version": "1.1",
      "method": "GET",
      "path": ["${path}"]
                },
      "response": {}
                }
                },`
    } else {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
      "header": {
        "type": "http",
        "request": {
          "version": "1.1",
          "method": "GET",
          "path": ["${path}"],
          "headers":{
            "Host": [${justhosts}]
                    }
                  },
        "response": {}
                  }
                  },`
    }
  } else if (t == 2) {
    if (h == 0 && headerOnOff == false) {
      var settings = `"wsSettings": {${acceptProxyProtocol}
      "header": {
      "type": "none"
                }
                },`
    } else if (h == 1 && headerOnOff == false) {
      var settings = `"wsSettings": {${acceptProxyProtocol}
                "path": "${path}",
                "header": {
                    "type": "none"
                }
                },`
    } else {
      var settings = `"wsSettings": {${acceptProxyProtocol}
      "path": "${path}",
      "headers": {
      "Host": ${justhosts}
           }
},`
    }
  } else {
    if (s == 0) {
      var settings = `"grpcSettings": {
      "serviceName": "${protocol}"
            },`
    } else {
      var settings = `"grpcSettings": {
      "serviceName": "${sni}"
        },`
    }
  }
  if (s == 0) {
    final.value = `{
      "tag": "${tag}",
      "listen": "0.0.0.0",
      "port": ${port},
      "protocol": "${protocol}",
      ${decryptionSettings}
      "streamSettings": {
      "network": "${transmission}",
      ${settings}
      "security": "none"
                }${sniftext}
                  },`
  }

  if (s > 0) {
    final.value =
      `{
"tag": "` +
      tag +
      `",
"listen": "0.0.0.0",
"port": ` +
      port +
      `,
"protocol": "` +
      protocol +
      `",
      ${decryptionSettings}
"streamSettings": {
"network": "` +
      transmission +
      `",
` +
      settings +
      `
"security": "` +
      security +
      `",
"tlsSettings": {
      "serverName": "` +
      sni +
      `",
      "certificates": [
        {
      "ocspStapling": 3600,
      "certificateFile": "` +
      pubkey +
      `",
      "keyFile": "` +
      pvkey +
      `"
        }
                    ],
      "rejectUnknownSni": false,
      "allowInsecure": false,
      "alpn": ["h2", "http/1.1"],
      "minVersion": "1.2",
      "maxVersion": "1.3",
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
}
}${sniftext}
},`
  }
}

function BuildReality(pts, t, s, protocol, transmission,
  security,
  name,
  port,
  dest,
  ServerNames,
  ShortIds,
  SpiderX,
  PublicKey,
  PrivateKey,
  h,
  path,
  fields,
  acceptProxyProtocol,
  headerOnOff,
  publickeyStatus,
  sniftext, sniffing
) {
  var pts = pts.toString()
  var t = t.toString()
  var s = s.toString()
  var protocol = protocol.toString()
  var transmission = transmission.toString()
  var security = security.toString()
  var tag = name.toString()
  var port = port.toString()
  var dest = dest.toString()
  var ServerNames = ServerNames.toString()
  var ArrayServerNames = ServerNames.split(',')
  var publickeyStatus = publickeyStatus

  // حذف فضاهای اضافی از هر کلمه و افزودن گیومه به اطراف آن
  for (var i = 0; i < ArrayServerNames.length; i++) {
    ArrayServerNames[i] = ArrayServerNames[i].trim()
    if (ArrayServerNames[i].indexOf(' ') === -1) {
      ArrayServerNames[i] = '"' + ArrayServerNames[i] + '"'
    }
  }

  // ایجاد یک رشته نهایی با کاما جداکننده
  var finalServerNames = ArrayServerNames.join(',')

  var ShortIds = ShortIds.toString()
  var SpiderX = SpiderX.toString()
  var PublicKey = PublicKey.toString()
  var PrivateKey = PrivateKey.toString()
  var h = h.toString()
  var acceptProxyProtocol = acceptProxyProtocol
  var headerOnOff = headerOnOff
  var fields = fields
  var path = path.toString()
  document.getElementById('final').style.display = 'block'
  var final = document.getElementById('final')
  if (publickeyStatus) {
    var Pub = `
          "publicKey": "${PublicKey}",`
  } else {
    Pub = ''
  }

  if (sniffing) {
    sniftext = sniftext;

  }
  else {

    sniftext = '';
  }

  //حالتی که ریکوئست هدر فعال است
  if (h == 1 && fieldCounter > 0 && headerOnOff) {
    if (fields.length > 0) {
      var result = '' // متغیر برای ذخیره نهایی
      var justhosts = ''
      for (
        var k = fields.length + 1 - fields.length - 1;
        k < fields.length;
        k += 2
      ) {
        var key = fields[k].value
        var value = fields[k + 1].value

        // اضافه کردن مقدار template به متغیر result
        result += `"${key}": "${value}"`
        justhosts += `"${value}"`
        // اگر نهایت رشته نیست، یک کاما و یک اینتر (یا خط جدید) اضافه کنید
        if (k < fields.length - 2) {
          result += ',\n'
          justhosts += ','
        }
      }
    }
  }
  if (t == 1) {
    if (h == 0 && headerOnOff == false) {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
      "header": {
      "type": "none"
  }
},`
    } else if (h == 1 && headerOnOff == false) {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
      "header": {
      "type": "http",
      "request": {
      "version": "1.1",
      "method": "GET",
      "path": ["${path}"]
                },
      "response": {}
                }
                },`
    } else {
      var settings = `"tcpSettings": {${acceptProxyProtocol}
      "header": {
        "type": "http",
        "request": {
          "version": "1.1",
          "method": "GET",
          "path": ["${path}"],
          "headers":{
            "Host": [${justhosts}]
                    }
                  },
        "response": {}
                  }
                  },`
    }

    final.value = `{
      "tag": "${tag}",
      "listen": "0.0.0.0",
      "port": ${port},
      "protocol": "${protocol}",
      "settings": {
        "clients": [],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        ${settings}
        "security": "reality",
        "realitySettings": {
          "show": false,
          "dest": "${dest}",
          "xver": 0,
          "serverNames": [
            ${finalServerNames}
          ],
          "privateKey": "${PrivateKey}",${Pub}
          "spiderX": "${SpiderX}",
          "shortIds": [
            "${ShortIds}"
          ]
        }
      }${sniftext}
    },`;


  } else if (t == 5) {
    var settings = `"grpcSettings": {
      "serviceName": "${port}"
    },`

    final.value = `{
"tag": "${tag}",
"listen": "0.0.0.0",
"port": ${port},
"protocol": "${protocol}",
"settings": {
"clients": [],
"decryption": "none"
},
"streamSettings": {
"network": "grpc",
${settings}
"security": "reality",
"realitySettings": {
"show": false,
"dest": "${dest}",
"xver": 0,
"serverNames": [
${finalServerNames}
],
"privateKey": "${PrivateKey}",
${Pub}
"spiderX": "${SpiderX}",
"shortIds": [
"${ShortIds}"
]
}}${sniftext}
},`
  }
}





const final = document.getElementById('final')
const copyButton = document.getElementById('sutton')

copyButton.addEventListener('click', function () {
  // انجام عملیات کپی متن از textarea
  final.select() // انتخاب متن
  document.execCommand('copy') // انجام عملیات کپی

  // دیگر عملیات یا نمایش پیام موفقیت انجام داده شود
})

document.getElementById('youtube').addEventListener('click', function () {
  window.open(
    'https://www.youtube.com/channel/UCDBnd7heT6Gz6QgqtxvtuEw/',
    '_blank'
  )
})

document.getElementById('github').addEventListener('click', function () {
  window.open('https://github.com/azavaxhuman', '_blank')
})

document.getElementById('github1').addEventListener('click', function () {
  window.open('https://github.com/Gozargah/Marzban', '_blank')
})
const button = document.getElementById("random");


function actualname() {
  const networklMapping = {
    tcpudp: 'tcp,udp',
    tcpS: 'tcp',
    udpS: 'udp',
  }
  let MainForm = document.getElementById('MainDetails')
  let protocol = MainForm.elements.protocol.value
  let transmission = MainForm.elements.transmission.value
  let security = MainForm.elements.security.value
  if (protocol == 'shadowsocks') {
    transmission = networklMapping[document.getElementById('network').value];
    security = 'none';

  }
  if (security != 'none') {
    security = " + " + security;
  }
  else {
    security = '';
  }
  var actualname = protocol + " + " + transmission + security;
  document.getElementById('inboundname').value = actualname.toUpperCase();
  protocolDetails();

}
function randomports() {
  document.getElementById('port').value = Math.floor(Math.random() * 8976 + 1024);
  protocolDetails();
}
function randomize() {
  const randomValue = generateRandomString(4);
  const newValue = randomValue;
  document.getElementById('inboundname').value = newValue;
  protocolDetails();
}
function generateRandomString(length) {
  const charset = "ABCDEFtuvwxyz0123456789";
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset.charAt(randomIndex);
  }

  return result;
}


function BuildShadow(network, name, port) {
  const networklMapping = {
    tcpudp: 'tcp,udp',
    tcpS: 'tcp',
    udpS: 'udp',
  }

  var final = document.getElementById('final');
  var network = network.toString();
  var name = name;

  var port = port;
  document.getElementById('acceptProxyProtocols').style.display = "none";
  document.getElementById('divheader').style.display = "none";
  document.getElementById('sniffingDiv').style.display = "none";
  document.getElementById('SniffingCheckbox').style.display = "none";

  var Net = networklMapping[network];
  final.value = `{
    "tag": "${name}",
    "listen": "0.0.0.0",
    "port": ${port},
    "protocol": "shadowsocks",
    "settings": {
        "clients": [],
        "network": "${Net}"
    }
},`;

}
