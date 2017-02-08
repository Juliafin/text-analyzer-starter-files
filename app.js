var getUniqueWords = function(aryWords) {
  var word_keeper = {};
  var count = 0;

  word_keeper = aryWords.reduce(function(accum, item) {
    if(accum.hasOwnProperty(item)) {
      accum[item].count += 1;
    } else {
      count += 1;
      accum[item] = { count: 1 }
    }
    return accum;
  }, {});

  return count;
};

var getAverageWordLength = function(aryWords) {
  var aryWordsLen = [], totalChars = 0;

  aryWordsLen = aryWords.map(function(item) {
    return item.length;
  });

  totalChars = aryWordsLen.reduce(function(accum, item) {
    return accum + item;
  }, 0)

  return totalChars / aryWordsLen.length;
};

var getAverageSentenceLength = function(arySentences) {
  var aryWordsLen = [], totalWords = 0;

  aryWordsLen = arySentences.map(function(item) {
    return item.split(' ').length;
  });

  totalWords = aryWordsLen.reduce(function(accum, item) {
    return accum + item;
  }, 0)

  return totalWords / arySentences.length;
};

$('form#analyze-text').submit(function (e) {
  e.preventDefault();

  // think about data structures, used in calculations
  var data = {
    text: '',
    plain_text: '',
    sentences: [],
    words: []
  };

  // populate the data object
  data.text = $(this).find('textarea').first().val();
  data.plain_text = data.text.replace(/[^a-zA-Z0-9\s]/g, "");
  data.sentences = data.plain_text.split("\n");
  data.words = data.plain_text.replace(/[\n]/g, ' ').split(' ');

  // display calculations
  $('#word_count').text(data.words.length);
  $('#unique_word_count').text(getUniqueWords(data.words));
  $('#average_word_length').text(getAverageWordLength(data.words));
  $('#average_sentence_length').text(getAverageSentenceLength(data.sentences));

  // show the results
  $('.text-report').removeClass('hidden');

  console.log('data', data);
})
