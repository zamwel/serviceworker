
export interface TempDecryptedData {
    indexNumber: string;
    candidateName: string;
    examType: string;
    center: string;
    subjects: { name: string; grade: string; interpretation: string }[];
    country: string;
    countryCode: string;
    cardUse: string;
    encryptedText: string;
}

export const template = (data: TempDecryptedData) => {
    return `
    <html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <script src="./temp_assets/jquery-3.2.1.min.js"></script>

    <title>WAECDIRECT ONLINE INFORMATION SERVICE - RESULTS</title>
    <link rel="STYLESHEET" type="text/css" href="./temp_assets/waecdirect.css">

    <script src="./temp_assets/jquery-1.10.2.js"></script>
    <script src="./temp_assets/qrcode.min.js"></script>
    <style type="text/css">
        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-100.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-100.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-100.ttf) format("truetype");
            font-style: normal;
            font-weight: 100;
            font-display: swap
        }

        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-300.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-300.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-300.ttf) format("truetype");
            font-style: normal;
            font-weight: 300;
            font-display: swap
        }

        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-400.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-400.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-400.ttf) format("truetype");
            font-style: normal;
            font-weight: 400;
            font-display: swap
        }

        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-500.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-500.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-500.ttf) format("truetype");
            font-style: normal;
            font-weight: 500;
            font-display: swap
        }

        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-700.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-700.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-700.ttf) format("truetype");
            font-style: normal;
            font-weight: 700;
            font-display: swap
        }

        @font-face {
            font-family: "Roboto";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-900.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-900.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Roboto/roboto-900.ttf) format("truetype");
            font-style: normal;
            font-weight: 900;
            font-display: swap
        }

        @font-face {
            font-family: "Rebond";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-400.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-400.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-400.ttf) format("truetype");
            font-style: normal;
            font-weight: 400;
            font-display: swap
        }

        @font-face {
            font-family: "Rebond";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-500.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-500.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-500.ttf) format("truetype");
            font-style: normal;
            font-weight: 500;
            font-display: swap
        }

        @font-face {
            font-family: "Rebond";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-600.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-600.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-600.ttf) format("truetype");
            font-style: normal;
            font-weight: 600;
            font-display: swap
        }

        @font-face {
            font-family: "Rebond";
            src: url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-700.woff) format("woff"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-700.woff2) format("woff2"), url(chrome-extension://emalgedpdlghbkikiaeocoblajamonoh/fonts/Rebond/rebond-700.ttf) format("truetype");
            font-style: normal;
            font-weight: 700;
            font-display: swap
        }

        #__wikibuy__ .__wikibuy.__onTop,
        body~div:not(#gdx-bubble-host),
        #piggyWrapper,
        #honeyContainer,
        #earny-root {
            position: absolute !important;
            z-index: 100000 !important
        }

        .mm-slideout {
            z-index: initial
        }

        .sorry-for-this__empty-styles {
            position: relative;
            z-index: 10000
        }

        #fahccdebgieffbicjaeefhhdigchdiec div:empty {
            display: block !important;
        }
    </style>
    <style data-styled="active" data-styled-version="5.3.9">
        .dWTrLf {
            visibility: hidden;
        }

        .igvzJt {
            font-family: roboto;
            font-weight: 100;
        }

        .igvzJr {
            font-family: roboto;
            font-weight: 300;
        }

        .igvzJo {
            font-family: roboto;
            font-weight: 400;
        }

        .igvzJp {
            font-family: roboto;
            font-weight: 500;
        }

        .igvzJn {
            font-family: roboto;
            font-weight: 700;
        }

        .igvzJl {
            font-family: roboto;
            font-weight: 900;
        }

        .uAvZv {
            font-family: rebond;
            font-weight: 400;
        }

        .uAvZu {
            font-family: rebond;
            font-weight: 500;
        }

        .uAvZx {
            font-family: rebond;
            font-weight: 600;
        }

        .uAvZw {
            font-family: rebond;
            font-weight: 700;
        }
    </style>
    <script type="text/javascript">
        (function() {
            function block() {
                document.documentElement.innerHTML = "<!-- Suspicious Activity Detected -->";
                window.location.href = "about:blank";
            }

            // Prevent Context Menu
            window.addEventListener('contextmenu', e => e.preventDefault(), true);

            // Prevent Shortcuts
            window.addEventListener('keydown', e => {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
            }, true);

            // DevTools Detection
            setInterval(() => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                if (end - start > 100) {
                    block();
                }
            }, 500);

            // Size Detection (Simplified)
            let lastWidth = window.outerWidth;
            let lastHeight = window.outerHeight;
            setInterval(() => {
                if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                    // This can sometimes trigger on zoom, so be careful, but often indicates docked DevTools
                }
            }, 1000);

            // Disable Selection
            document.addEventListener('selectstart', e => e.preventDefault(), true);
        })();
    </script>
</head>

<body bgcolor="#ffffff" topmargin="0" style="">
    <table width="480" border="0" align="center" cellpadding="0" cellspacing="0" style="background: #999999;"
        valign="top">
        <tbody>
            <tr>
                <td valign="top">
                    <font color="#003300" size="4"><strong>
                            <img src="./temp_assets/top_small.jpg" alt="WAEC logo" width="480" height="66" hspace="0"
                                vspace="0" border="0" align="left"></strong></font>
                </td>
            </tr>
            <tr>
                <td width="481" valign="top">
                    <div align="center">
                        <font color="#003300" size="4"></font>
                        <table width="100%" border="0" align="center" cellpadding="4" cellspacing="1" bgcolor="#003300"
                            style="background-color: #999999;" valign="top">
                            <tbody>
                                <tr>
                                   <th valign="top" colspan="3">
                                        <div align="center">
                                            <font color="#FFFFFF" size="4" face="Geneva, Arial, Helvetica, sans-serif">
                                                Result Checking
                                            </font>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <td colspan="3" valign="top" class="disclaimer">
                                        <p align="justify">
                                            <!--  <strong><font color="#FF0000">Disclaimer </font>:</strong> <font color="#000033"
                                        face="Comic Sans MS">The Provisional Results given below are correct at the time of release
                                        of the results. The Council and its agents accept no responsibility thereafter for
                                        errors or omissions caused as a result of their transmission via the Internet or
                                        their downloading or printing by the user.</font> <font color="#000033">&nbsp;
                                    </font>  -->

                                            <strong>
                                                <font color="#FF0000">Disclaimer </font>:
                                            </strong>
                                            <font color="#000033" face="Comic Sans MS">THE RESULTS GIVEN BELOW ARE
                                                PROVISIONAL. THE FINAL RESULTS ARE THOSE WHICH WILL BE PRINTED ON YOUR
                                                CERTIFICATE.</font>
                                            <font color="#000033">&nbsp;
                                            </font>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="3" valign="middle" class="title">
                                        <div align="left">
                                            <font size="3">Candidate's Details</font>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <td colspan="3" valign="middle" align="right" class="result">
                                    <span id="qrCode" width="150">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&ecc=H&margin=50&format=svg&qzone=30&data=${data.encryptedText}"> 
                                    </span>                                        
                                        <!-- <img src="./temp_assets/image.ashx" border="0" alt="User Passport" style="float: right" width="120" height="120" align="right" name="Passport"> -->
                                        <img src="https://pixarchiver.waecgh.org/image.ashx?extype=01&exyear=${data.examType.split(", ")[1]}&index=${data.indexNumber}" border="0" alt="User Passport" style="float: right" width="120" height="120" align="right" name="Passport">                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" align="center" class="result">
                                        <font color="#000033" face="Comic Sans MS">RESULTS OF THE CANDIDATE ON THIS
                                            PRINT-OUT
                                            CAN BE CROSS-CHECKED BY SCANNING THE ENCRYPTED QR-CODE. DOWNLOAD WAEC ${data.countryCode}
                                            QRCODE READER ON GOOGLE PLAY FOR ANDROID PHONES</font>
                                    </td>
                                </tr>
                                <tr>
                                    <th valign="top" class="result">
                                        Index Number
                                    </th>
                                    <td colspan="2" valign="top" class="result">
                                        ${data.indexNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="182" valign="top" class="result">
                                        Candidate Name
                                    </th>
                                    <td colspan="2" valign="top" class="result">
                                        ${data.candidateName}
                                    </td>
                                </tr>
                                <tr>
                                    <th valign="top" class="result">
                                        Type of Examination
                                    </th>
                                    <td colspan="2" valign="top" class="result">
                                        ${data.examType}
                                    </td>
                                </tr>
                                <tr>
                                    <th class="result" valign="top">
                                        Examination Centre
                                    </th>
                                    <td colspan="2" valign="top" class="result">
                                        ${data.center}
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="3" valign="middle" class="title">
                                        <div align="left">
                                            <font size="3">Card Details</font>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="result" valign="top">
                                        Card use
                                    </th>
                                    <td colspan="2" valign="top" class="result">
                                        ${data.cardUse}
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="3" valign="top" class="title">
                                        <font size="3">Results</font>
                                    </th>
                                </tr>

                                ${data.subjects.map((subject) => (
        `<tr>
                                        <th class="result" valign="top">
                                            ${subject.name}
                                        </th>
                                        <td width="96" valign="top" class="result">
                                            ${subject.grade}
                                        </td>
                                        <td width="175" valign="top" class="result">
                                            ${subject.interpretation}
                                        </td>
                                    </tr>`
    )).join('')}
    
                                <script type="text/javascript">
                                    jQuery(document).ready(function ($) {
                                        jQuery.ajax({
                                            type: "POST",
                                            dataType: "json",
                                            contentType: "application/json",
                                            url: "QRCode.ashx",
                                            data: { 'txt': ${data.indexNumber}|${data.candidateName}|${data.examType}|${data.center}|${data.subjects.map((subject) => `${subject.name}:${subject.grade}`).join('|')},'chk': '45f6459c7164522e8ac97ca53bc86317' },
                                            success: function (data) {
                                                var status = data.Status;
                                                console.log(status);
                                                console.log(data);
                                                if (status == 1) {
                                                    $('#qrCode').html(data.Msg);
                                                }
                                                else {
                                                    alert(data.Msg);
                                                }
                                            },
                                            // error: function () {
                                            error: function (xhr, ajaxOptions, thrownError) {
                                                //alert("Error calling the web service. " + xhr.status);
                                            }
                                        });
                                    });
                                </script>

                            </tbody>
                        </table>
                        <font size="2" face="Geneva, Arial, Helvetica, sans-serif">
                            <br>
                            <a href="javascript:window.print()">Click to Print This Page</a>
                        </font><br>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
    <div align="center">
        <br>
        <br>
    </div>



</body>

</html>
    `
}

