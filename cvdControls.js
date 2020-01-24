var txtAgeToolTipOn = 1;
var bpSysToolTipOn = 1;
var txtBMIToolTipOn = 1;
var txtSerCreatToolTipOn = 1;
var COPDToolTipOn = 1;

$(function () {
    $(".controlgroup").controlgroup();
    $(".controlgroup-vertical").controlgroup({
        "direction": "vertical"
    });
});
// get selection
$('.colors input[type=radio]').on('change', function () {
    console.log(this.value);
});
$("input:radio[name='thename']").each(function (i) {
    this.checked = false;
});
$(document).ready(function () {
    $("#txtAge").focus();
    $("#txtAge").tooltip({title: "Please enter an age between 20 and 79", placement: "bottom", trigger: "manual"});
    $("#txtBMI").tooltip({title: "Please enter a BMI between 15 and 50", placement: "bottom", trigger: "manual"});
    $("#sexMark").tooltip({title: "Please choose either Male or Female", placement: "bottom", trigger: "manual"});
    $("#raceMark").tooltip({title: "Please choose White, African American or Other", placement: "bottom", trigger: "manual"});
    $("#BP_Sys").tooltip({title: "Please enter a systolic blood pressure between 80 and 300 mm HG", placement: "right", trigger: "manual"});
    $("#diabMark").tooltip({title: "Please choose either yes or no",placement: "bottom", trigger: "manual"});
    $("#smokeMark").tooltip({title: "Please choose current, former or never",placement:"bottom",trigger:"manual"});
    $("#hyperMark").tooltip({title: "Please choose either yes or no",placement:"bottom",trigger:"manual"});
    $("#Ser_Creat").tooltip({title:"Please enter a serum creatinine level between x and y",placement:"bottom",trigger:"manual"});
    $("#COPD").tooltip({title:"Please choose either yes or no", placement: "bottom",trigger:"manual"});
    $('#sub').on('click', function (event) {
        var isvalidate = $("#myForm")[0].checkValidity();
        if ((isvalidate) && txtAge_Val() && txtBMI_Val() && bpSys_Val()) {
            event.preventDefault();
            var risk_res = [];
            risk_res = calc_risk();
            
            $('#message').html('Your HFpEF risk is ' + risk_res[0]+"%<br/>Your HFrEF risk is "+risk_res[1]+"%");
            $('#myModal').modal('show');
        }
        else
        {
            
            if (txtAge_Val())
            {
                txtAgeToolTipOn = 1;
                $("#txtAge").tooltip("hide");
                if (($("input[name = 'Sex']:checked").val() !== 'Male') && ($("input[name = 'Sex']:checked").val() !== 'Female'))
                {
                    $("#sexMark").tooltip("show");
                    $("#Sex").focus();
                }
                else
                {
                    $("#sexMark").tooltip("hide");
                    if (($("input[name = 'Race']:checked").val() != 'White') && ($("input[name = 'Race']:checked").val() != 'AfrAm')
                            && ($("input[name = 'Race']:checked").val() != 'Hisp') && ($("input[name = 'Race']:checked").val() != 'Other'))
                    {
                        $("#raceMark").tooltip("show");
                        $("#Race").focus();
                    }
                    else
                    {
                  
                        if (txtBMI_Val())
                        {
                            txtBMIToolTip = 1;
                            $("#txtBMI").tooltip("hide");
                            if (($("input[name = 'Diabetes']:checked").val() !== 'Yes') && ($("input[name = 'Diabetes']:checked").val() != 'No'))
                            {
                                $("#diabMark").tooltip("show");
                                $("#diab").focus();
                            }
                            else
                            {
                                $("#diabMark").tooltip("hide");
                                if (($("input[name = 'Smoker']:checked").val() !== 'Current') && ($("input[name = 'Smoker']:checked").val() !== 'Former') && ($("input[name = 'Smoker']:checked").val() !== 'Never'))
                                {
                                    $("#smokeMark").tooltip("show");
                                    $("#smoker").focus();
                                }
                                else
                                {
                                    $("#smokeMark").tooltip("hide");
                                    if (($("input[name = 'Hypertension']:checked").val() !== 'Yes') && ($("input[name = 'Hypertension']:checked").val() !== 'No'))
                                    {
                                        $("#hyperMark").tooltip("show");
                                        $("#Hypertension").focus();
                                    }
                                    else
                                    {
                                        $("#hyperMark").tooltip("hide");
                                        if (($("input[name = 'COPD']:checked").val() !== 'Yes') && ($("input[name = 'COPD']:checked").val() !== 'No'))
                                        {
                                            $("#COPDMark").tooltip("show");
                                            $("#COPD").focus();
                                        }
                                        else
                                        {
                                            $("#COPDMark").tooltip("hide");
                                            if (!(bpSys_Val()))
                                            {
                                                $("#bpSys").tooltip("show");
                                                $("#bpSys").focus();
                                            }
                                            else
                                            {
                                                $("#bpSys").tooltip("hide");
                                                bpSysToolTipOn = 1;
                                            }
                                        }
                                    }
                                }
                            }
                    }   
                }
                }
            }
        }
    });
    $("#txtAge").blur(function () {
          if (txtAge_Val())
          {
            txtAgeToolTipOn = 1;
          }
    });
    
    $("#txtBMI").blur(function() {
        if (txtBMI_Val())
        {
            txtBMIToolTipOn = 1;
        }
    });

    $("input[name='Sex']").change(function () {
        $("#sexMark").tooltip("hide");
        if ($("input[name='Sex']:checked").val()==="Male")
        {
            $("#sexMark").addClass("btn-selected");
            $("#maleGlyph").show();
            $("#femaleGlyph").hide();            
            $("#sexMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#sexMark1").addClass("btn-selected");
            $("#femaleGlyph").show();
            $("#maleGlyph").hide();
            $("#sexMark").removeClass("btn-selected");
        }
        $("#Race").focus();
    });

    $("input[name='Race']").change(function () {
        $("#raceMark").tooltip("hide");
        if ($("input[name='Race']:checked").val()==="White")
        {
            $("#raceMark").addClass("btn-selected");
            $("#whiteGlyph").show();
            $("#afrAmGlyph").hide();            
            $("#raceMark1").removeClass("btn-selected");
        }
        else
        {
            $("#raceMark1").addClass("btn-selected");
            $("#afrAmGlyph").show();
            $("#whiteGlyph").hide();
            $("#raceMark").removeClass("btn-selected");
        }
        $("#Diabetes").focus();
    });
    $("input[name='Diabetes']").change(function () {
        $("#diabMark").tooltip("hide");
        if ($("input[name='Diabetes']:checked").val()==="Yes")
        {
            $("#diabMark").addClass("btn-selected");
            $("#diabYGlyph").show();
            $("#diabNGlyph").hide();            
            $("#diabMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#diabMark1").addClass("btn-selected");
            $("#diabNGlyph").show();
            $("#diabYGlyph").hide();
            $("#diabMark").removeClass("btn-selected");
        }
        $("#Smoker").focus();
    });
    $("input[name='Smoker']").change(function () {
       $("#smokeMark").tooltip("hide");
       if ($("input[name='Smoker']:checked").val()==="Current")
        {
            $("#smokeMark").addClass("btn-selected");
            $("#smokeYGlyph").show();
            $("#smokeNGlyph").hide(); 
            $("#smokeY1Glyph").hide();
            $("#smokeMark1").removeClass("btn-selected");
            $("#smokeMark0").removeClass("btn-selected");
        }
        else if ($("input[name='Smoker']:checked").val()==="Former")
        {
            
            $("#smokeMark0").addClass("btn-selected");
            $("#smokeY1Glyph").show();
            $("#smokeYGlyph").hide();
            $("#smokeNGlph").hide()
            $("#smokeMark").removeClass("btn-selected");
            $("#smokeMark1").removeClass("btn-selected");
        }
        else
                    {
            
            $("#smokeMark1").addClass("btn-selected");
            $("#smokeNGlyph").show();
            $("#smokeYGlyph").hide();
            $("#smokeY1Glyph").hide();
            $("#smokeMark").removeClass("btn-selected");
            $("#smokeMark0").removeClass("btn-selected");
        }
       $("#Hypertension").focus();
    });
    $("input[name='Hypertension']").change(function (){
       $("#hyperMark").tooltip("hide");
       if ($("input[name='Hypertension']:checked").val()==="Yes")
        {
            $("#hyperMark").addClass("btn-selected");
            $("#hyperYGlyph").show();
            $("#hyperNGlyph").hide();            
            $("#hyperMark1").removeClass("btn-selected");
        }
        else
        {
            $("#hyperMark1").addClass("btn-selected");
            $("#hyperNGlyph").show();
            $("#hyperYGlyph").hide();
            $("#hyperMark").removeClass("btn-selected");
        }
       $("PrevMI").focus();
    });
    $("input[name='PrevMI']").change(function () {
       $("#prevMIMark").tooltip("hide");
       if ($("input[name='PrevMI']:checked").val()==="Yes")
        {
            $("#prevMIMark").addClass("btn-selected");
            $("#prevMIYGlyph").show();
            $("#prevMINGlyph").hide();            
            $("#prevMIMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#prevMIMark1").addClass("btn-selected");
            $("#prevMINGlyph").show();
            $("#prevMIYGlyph").hide();
            $("#prevMIMark").removeClass("btn-selected");
        }
       $("#PrevCAD").focus();
    });
    $("input[name='PrevCAD']").change(function () {
       $("#CADMark").tooltip("hide");
       if ($("input[name='PrevCAD']:checked").val()==="Yes")
        {
            $("#CADMark").addClass("btn-selected");
            $("#CADYGlyph").show();
            $("#CADNGlyph").hide();            
            $("#CADMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#CADMark1").addClass("btn-selected");
            $("#CADNGlyph").show();
            $("#CADYGlyph").hide();
            $("#CADMark").removeClass("btn-selected");
        }
       $("#PrevAFIB").focus();
    });
     $("input[name='PrevAFIB']").change(function () {
       $("#aFibMark").tooltip("hide");
       if ($("input[name='PrevAFIB']:checked").val()==="Yes")
        {
            $("#aFibMark").addClass("btn-selected");
            $("#AFIBYGlyph").show();
            $("#AFIBNGlyph").hide();            
            $("#aFibMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#aFibMark1").addClass("btn-selected");
            $("#AFIBNGlyph").show();
            $("#AFIBYGlyph").hide();
            $("#aFibMark").removeClass("btn-selected");
        }
       $("#COPD").focus();
    });
    $("input[name='COPD']").change(function () {
       $("#COPDMark").tooltip("hide");
       if ($("input[name='COPD']:checked").val()==="Yes")
        {
            $("#COPDMark").addClass("btn-selected");
            $("#COPDYGlyph").show();
            $("#COPDNGlyph").hide();            
            $("#COPDMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#COPDMark1").addClass("btn-selected");
            $("#COPDNGlyph").show();
            $("#COPDYGlyph").hide();
            $("#COPDMark").removeClass("btn-selected");
        }
       $("#bpSys").focus();
    });
    $("#COPD").blur(function () {
        if (COPD_Val())
        {
            COPDToolTipOn = 1;
        }
    });
    $("#Ser_Creat").blur(function () {
        if (serCreat_Val())
        {
            txtSerCreat = 1;
        }
    });
    
       
});

function txtAge_Val() {
        var input = $("#txtAge");
        if ((parseInt(input.val()) < 20 || parseInt(input.val()) > 79) || (input.val() === ''))
        {
            if (txtAgeToolTipOn===1)
            {
                $("#txtAge").tooltip("show");
                input.removeClass("valid").addClass("invalid");
                $("#myForm input").prop("disabled",true);
                $("#myForm button").prop("disabled",true);
                $("#txtAge").prop("disabled",false);
                $("#txtAge").focus();
                txtAgeToolTipOn = 0;
            }
             return false;
        }
        else
        {
            $("#txtAge").tooltip("hide");
            input.removeClass("invalid").addClass("valid");
            $("#myForm input").prop("disabled",false);
            $("#myForm button").prop("disabled",false);
            $("#Sex").focus();
            return true;
        }
}

function txtBMI_Val() {
        var input = $("#txtBMI");
        
        if ((parseInt(input.val()) < 15 || parseInt(input.val()) > 50) || (input.val() === ''))
        {
            if (txtBMIToolTipOn===1)
            {
                $("#txtBMI").tooltip("show");
                input.removeClass("valid").addClass("invalid");
                $("#myForm input").prop("disabled",true);
                $("#myForm button").prop("disabled",true);
                $("#txtBMI").prop("disabled",false);
                $("#txtBMI").focus();
                txtBMIToolTipOn = 0;
            }
             return false;
        }
        else
        {
            $("#txtBMI").tooltip("hide");
            input.removeClass("invalid").addClass("valid");
            $("#myForm input").prop("disabled",false);
            $("#myForm button").prop("disabled",false);
            $("#Diabetes").focus();
            return true;
        }
}
function bpSys_Val() {
    var input = $("#BP_Sys");

    if (parseInt(input.val()) < 80 || parseInt(input.val()) > 300 || input.val() === "")
    {

        if (bpSysToolTipOn ===1)
        {
            $("#BP_Sys").tooltip("show");
            $("#BP_Sys").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#BP_Sys").prop("disabled",false);
            $("#BP_Sys").focus();
            bySysToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#BP_Sys").tooltip("hide");
        $("#BP_Sys").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        $("#Ser_Creat").focus();
        return true;
    }
} 

function serCreat_Val() {
    var input = $("#Ser_Creat");
    if (parseFloat(input.val()) < .5 || parseFloat(input.val()) > 1.2 || input.val() === "")
    {

        if (txtSerCreatToolTipOn ===1)
        {
            $("#Ser_Creat").tooltip("show");
            $("#Ser_Creat").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#Ser_Creat").prop("disabled",false);
            $("#Ser_Creat").focus();
            txtSerCreatToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#Ser_Creat").tooltip("hide");
        $("#Ser_Creat").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        return true;
    }
}



