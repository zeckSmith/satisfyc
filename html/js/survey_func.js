/*  Wizard */
jQuery(function ($) {
	"use strict";
	// Chose here which method to send the email, available:
	// Simple phpmail text/plain > survey.php (default)
	// PHPmailer text/html > phpmailer/survey_phpmailer.php
	// PHPmailer text/html SMPT > phpmailer/survey_phpmailer_smpt.php
	// PHPmailer with html template > phpmailer/survey_phpmailer_template.php
	// PHPmailer with html template SMTP> phpmailer/survey_phpmailer_template_smpt.php
	$('form#wrapped').attr('action', 'survey.php');
	$("#wizard_container").wizard({
		stepsWrapper: "#wrapped",
		submit: ".submit",
		beforeSelect: function (event, state) {
			if ($('input#website').val().length != 0) {
				return false;
			}
			if (!state.isMovingForward)
				return true;
			var inputs = $(this).wizard('state').step.find(':input');
			return !inputs.length || !!inputs.valid();
		}
	}).validate({
		errorPlacement: function (error, element) {
			if (element.is(':radio') || element.is(':checkbox')) {
				error.insertBefore(element.next());
			} else {
				error.insertAfter(element);
			}
		}
	});
	//  progress bar
	$("#progressbar").progressbar();
	$("#wizard_container").wizard({
		afterSelect: function (event, state) {
			$("#progressbar").progressbar("value", state.percentComplete);
			$("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
		}
	});
	// Validate select
	$('#wrapped').validate({
		ignore: [],
		rules: {
			select: {
				required: true
			}
		},
		errorPlacement: function (error, element) {
			if (element.is('select:hidden')) {
				error.insertAfter(element.next('.nice-select'));
			} else {
				error.insertAfter(element);
			}
		}
	});
});

// Summary 
function getVals(formControl, controlType) {
	switch (controlType) {

		case 'question_1':
			// Get the value for a radio
			var value = $(formControl).val();
			$("#question_1").text(value);
			break;

		case 'additional_message':
			// Get the value for a textarea
			var value = $(formControl).val();
			$("#additional_message").text(value);
			break;

		case 'question_2':
			// Get the value for a radio
			var value = $(formControl).val();
			$("#question_2").text(value);
			break;

		case 'additional_message_2':
			// Get the value for a textarea
			var value = $(formControl).val();
			$("#additional_message_2").text(value);
			break;

		case 'question_3':
			// Get name for set of checkboxes
			var checkboxName = $(formControl).attr('name');

			// Get all checked checkboxes
			var value = [];
			$("input[name*='" + checkboxName + "']").each(function () {
				// Get all checked checboxes in an array
				if (jQuery(this).is(":checked")) {
					value.push($(this).val());
				}
			});
			$("#question_3").text(value.join(", "));
			break;
	}
}

const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;
