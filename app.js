var Questions={
	items:[]
};

var correctQuesCount = 0;


var LoadInitialQuizData = function(Questions){
	Questions.items.push({
		quesNum:'1',
		question:'Who wrote the book Alice In Wonderland?',
		multipleChoiceData:['Louis Carroll','Lewis Carroll','J.K. Rowling'],
		correctAns:'Lewis Carroll',
		display:true
	},{
		quesNum:'2',
		question:'What is the abbreviation for Washington, D.C.?',
		multipleChoiceData:['WA','WD','DC'],
		correctAns:'DC',
		display:false
	},{
		quesNum:'3',
		question:'Were jeans always blue?',
		multipleChoiceData:['No','Yes','They were yellow'],
		correctAns:'No',
		display:false
	},{
		quesNum:'4',
		question:'What is the other name for General Motors?',
		multipleChoiceData:['G.M.','G Motors','General Ms'],
		correctAns:'G.M.',
		display:false
	},{
		quesNum:'5',
		question:'Where were cats most honored?',
		multipleChoiceData:['Greece','Egypt','USA'],
		correctAns:'Egypt',
		display:false
	});
}

var renderQuestions = function(Questions, element){
	var template;
	var totalQues = Questions.items.length;
	var quizHtml = Questions.items.map(function(item){

		if(item.display){
			template = '<span class="question-data"><span class="js-quesNum">'+item.quesNum+'</span>/'+totalQues+' '+item.question+'</span>';

			for(var i=0; i<item.multipleChoiceData.length; i++){
				template += '<span class="options-data"><input type="radio" name="choice" class="js-onchange" value="'+item.multipleChoiceData[i]+'">'+item.multipleChoiceData[i]+'</span>';

			}
			template+='<button type="button" class="btn btn-default-outline js-submit">Submit</button>';
		

			return template;
		}
		
			

	});
	element.html(quizHtml);
};

var getCorrectAns = function(Questions, currentQuesNum){

	var ans = Questions.items.find(function(item){

		if(item.quesNum === currentQuesNum){
			return item.correctAns;
		}

	});
	return ans.correctAns;
};

var renderStart = function(){
	var startHtml='<span class="js-start-msg">Your test will start once you hit start, Good Luck Friends!!</span><button type="button" class="btn btn-default-outline js-start">start</button>';
	$('.js-start-message').html(startHtml);

}

var renderFeedback = function(element, feedback,correctChoice){
	var feedbackHtml;
	$('.js-quiz-question').removeClass('show-div');
	$('.js-quiz-question').addClass('hide-div');
	$('.js-feedback').removeClass('hide-div');
	$('.js-feedback').addClass('show-div');
	if(feedback === "correct"){
		feedbackHtml = '<span class="correct-ans">Correct!!! Well done!</span><button type="button" class="btn btn-default-outline js-next">Next</button>';
	}else{
		feedbackHtml = '<span class="wrong-ans">Wrong!!!</span><span class="cheers-msg"><span class="correct-ans">Correct Answer:</span>' +correctChoice+'</span><button type="button" class="btn btn-default-outline js-next">Next</button>';
	}
	element.html(feedbackHtml);
};

var renderResult = function(element,correctAnsCount,totalCount){
	var resultHtml;
	$('.js-quiz-question').removeClass('show-div');
	$('.js-quiz-question').addClass('hide-div');
	$('.js-feedback').removeClass('hide-div');
	$('.js-feedback').addClass('show-div');
	resultHtml = '<h1>Result</h1><span class="quiz-result">You have got '+ correctAnsCount +' correct, '+ (totalCount - correctAnsCount) +' incorrect </span><button type="button" class="btn btn-default-outline js-start-over">Start Over</button>';
	element.html(resultHtml);
};

function updateItem(Questions, itemIndex,newIndex){
	if(itemIndex < Questions.items.length){
		Questions.items[itemIndex - 1].display = false;
		Questions.items[itemIndex].display = true;
		renderQuestions(Questions,$('.js-quiz-question'));
	}else{
		renderResult($('.js-feedback'),correctQuesCount,Questions.items.length)

	}
}

$('.js-quiz-question').on('click','.js-submit',function(event){
	
	var userAns = $('[name="choice"]:checked').val();
	if (!userAns) {
		alert("Must check some option!");
		return false;
	}
	var currentQuesNum = $('.js-quesNum').text();
	var correctQuesAns = getCorrectAns(Questions,currentQuesNum);
	var feedback;
	if(userAns === correctQuesAns){
		feedback = "correct";
		correctQuesCount++;
	}else{
		feedback = "wrong";
	}
	renderFeedback($('.js-feedback'),feedback,correctQuesAns);

});

$('.js-feedback').on('click','.js-next',function(event){
	$('.js-feedback').removeClass('show-div');
	$('.js-feedback').addClass('hide-div');
	$('.js-quiz-question').removeClass('hide-div');
	$('.js-quiz-question').addClass('show-div');
	var currentQuesNum = $('.js-quesNum').text();
	updateItem(Questions,currentQuesNum);


});

$('.js-feedback').on('click','.js-start-over',function(event){
	$('.js-start-message').removeClass('hide-div');
	$('.js-start-message').addClass('show-div');
	$('.js-feedback').removeClass('show-div');
	$('.js-feedback').addClass('hide-div');
	Questions.items = [];
	renderStart();

});
$('.js-start-message').on('click','.js-start',function(event){
	$('.js-start-message').removeClass('show-div');
	$('.js-start-message').addClass('hide-div');
	$('.js-quiz-question').removeClass('hide-div');
	$('.js-quiz-question').addClass('show-div');
	LoadInitialQuizData(Questions);
	renderQuestions(Questions,$('.js-quiz-question'));
});


function LoadQuizData(){
	renderStart();

}

$(function(){
	LoadQuizData();
});