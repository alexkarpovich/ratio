// Generated from /home/akarpovich/dev/ratio/web/src/artling/ArtlingLexer.g4 by ANTLR 4.6
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002\u001a\u00b4\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e",
    "\t\u001e\u0003\u0002\u0005\u0002?\n\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0005\fb\n\f\u0003\r\u0003\r\u0003\u000e\u0005\u000e",
    "g\n\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0006\u000fl\n\u000f\r",
    "\u000f\u000e\u000fm\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0005\u0016\u0099\n\u0016\u0003\u0017\u0006\u0017\u009c",
    "\n\u0017\r\u0017\u000e\u0017\u009d\u0003\u0018\u0003\u0018\u0003\u0018",
    "\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a",
    "\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c",
    "\u0003\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001e\u0003\u001e",
    "\u0002\u0002\u001f\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b",
    "\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0015\f\u0017\r\u0019\u000e\u001b",
    "\u0002\u001d\u0002\u001f\u000f!\u0010#\u0011%\u0012\'\u0013)\u0014+",
    "\u0002-\u0015/\u00161\u00173\u00025\u00027\u00189\u0019;\u001a\u0003",
    "\u0002\u0004\u0003\u000238\u0004\u0002\f\f\u000f\u000f\u00b9\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013",
    "\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017",
    "\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001f",
    "\u0003\u0002\u0002\u0002\u0002!\u0003\u0002\u0002\u0002\u0002#\u0003",
    "\u0002\u0002\u0002\u0002%\u0003\u0002\u0002\u0002\u0002\'\u0003\u0002",
    "\u0002\u0002\u0002)\u0003\u0002\u0002\u0002\u0002-\u0003\u0002\u0002",
    "\u0002\u0002/\u0003\u0002\u0002\u0002\u00021\u0003\u0002\u0002\u0002",
    "\u00027\u0003\u0002\u0002\u0002\u00029\u0003\u0002\u0002\u0002\u0002",
    ";\u0003\u0002\u0002\u0002\u0003>\u0003\u0002\u0002\u0002\u0005B\u0003",
    "\u0002\u0002\u0002\u0007D\u0003\u0002\u0002\u0002\tF\u0003\u0002\u0002",
    "\u0002\u000bH\u0003\u0002\u0002\u0002\rJ\u0003\u0002\u0002\u0002\u000f",
    "L\u0003\u0002\u0002\u0002\u0011O\u0003\u0002\u0002\u0002\u0013R\u0003",
    "\u0002\u0002\u0002\u0015V\u0003\u0002\u0002\u0002\u0017a\u0003\u0002",
    "\u0002\u0002\u0019c\u0003\u0002\u0002\u0002\u001bf\u0003\u0002\u0002",
    "\u0002\u001dk\u0003\u0002\u0002\u0002\u001fo\u0003\u0002\u0002\u0002",
    "!r\u0003\u0002\u0002\u0002#v\u0003\u0002\u0002\u0002%{\u0003\u0002\u0002",
    "\u0002\'\u0081\u0003\u0002\u0002\u0002)\u0088\u0003\u0002\u0002\u0002",
    "+\u0098\u0003\u0002\u0002\u0002-\u009b\u0003\u0002\u0002\u0002/\u009f",
    "\u0003\u0002\u0002\u00021\u00a2\u0003\u0002\u0002\u00023\u00a6\u0003",
    "\u0002\u0002\u00025\u00a9\u0003\u0002\u0002\u00027\u00ac\u0003\u0002",
    "\u0002\u00029\u00af\u0003\u0002\u0002\u0002;\u00b2\u0003\u0002\u0002",
    "\u0002=?\u0007\u000f\u0002\u0002>=\u0003\u0002\u0002\u0002>?\u0003\u0002",
    "\u0002\u0002?@\u0003\u0002\u0002\u0002@A\u0007\f\u0002\u0002A\u0004",
    "\u0003\u0002\u0002\u0002BC\u0007\u000b\u0002\u0002C\u0006\u0003\u0002",
    "\u0002\u0002DE\u0007,\u0002\u0002E\b\u0003\u0002\u0002\u0002FG\u0007",
    "\"\u0002\u0002G\n\u0003\u0002\u0002\u0002HI\u0007/\u0002\u0002I\f\u0003",
    "\u0002\u0002\u0002JK\u0007-\u0002\u0002K\u000e\u0003\u0002\u0002\u0002",
    "LM\u0007/\u0002\u0002MN\u0007\"\u0002\u0002N\u0010\u0003\u0002\u0002",
    "\u0002OP\u0007-\u0002\u0002PQ\u0007\"\u0002\u0002Q\u0012\u0003\u0002",
    "\u0002\u0002RS\u0007*\u0002\u0002ST\u0007*\u0002\u0002TU\u0007\"\u0002",
    "\u0002U\u0014\u0003\u0002\u0002\u0002VW\u0007\"\u0002\u0002WX\u0007",
    "+\u0002\u0002XY\u0007+\u0002\u0002Y\u0016\u0003\u0002\u0002\u0002Z[",
    "\u0007v\u0002\u0002[\\\u0007q\u0002\u0002\\b\u0007e\u0002\u0002]^\u0007",
    "g\u0002\u0002^_\u0007e\u0002\u0002_`\u0007j\u0002\u0002`b\u0007q\u0002",
    "\u0002aZ\u0003\u0002\u0002\u0002a]\u0003\u0002\u0002\u0002b\u0018\u0003",
    "\u0002\u0002\u0002cd\t\u0002\u0002\u0002d\u001a\u0003\u0002\u0002\u0002",
    "eg\u0007\u000f\u0002\u0002fe\u0003\u0002\u0002\u0002fg\u0003\u0002\u0002",
    "\u0002gh\u0003\u0002\u0002\u0002hi\u0007\f\u0002\u0002i\u001c\u0003",
    "\u0002\u0002\u0002jl\n\u0003\u0002\u0002kj\u0003\u0002\u0002\u0002l",
    "m\u0003\u0002\u0002\u0002mk\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002",
    "\u0002n\u001e\u0003\u0002\u0002\u0002op\u0007,\u0002\u0002pq\u0007\"",
    "\u0002\u0002q \u0003\u0002\u0002\u0002rs\u0007,\u0002\u0002st\u0007",
    ",\u0002\u0002tu\u0007\"\u0002\u0002u\"\u0003\u0002\u0002\u0002vw\u0007",
    ",\u0002\u0002wx\u0007,\u0002\u0002xy\u0007,\u0002\u0002yz\u0007\"\u0002",
    "\u0002z$\u0003\u0002\u0002\u0002{|\u0007,\u0002\u0002|}\u0007,\u0002",
    "\u0002}~\u0007,\u0002\u0002~\u007f\u0007,\u0002\u0002\u007f\u0080\u0007",
    "\"\u0002\u0002\u0080&\u0003\u0002\u0002\u0002\u0081\u0082\u0007,\u0002",
    "\u0002\u0082\u0083\u0007,\u0002\u0002\u0083\u0084\u0007,\u0002\u0002",
    "\u0084\u0085\u0007,\u0002\u0002\u0085\u0086\u0007,\u0002\u0002\u0086",
    "\u0087\u0007\"\u0002\u0002\u0087(\u0003\u0002\u0002\u0002\u0088\u0089",
    "\u0007,\u0002\u0002\u0089\u008a\u0007,\u0002\u0002\u008a\u008b\u0007",
    ",\u0002\u0002\u008b\u008c\u0007,\u0002\u0002\u008c\u008d\u0007,\u0002",
    "\u0002\u008d\u008e\u0007,\u0002\u0002\u008e\u008f\u0007\"\u0002\u0002",
    "\u008f*\u0003\u0002\u0002\u0002\u0090\u0099\u0005\u001f\u0010\u0002",
    "\u0091\u0099\u0005!\u0011\u0002\u0092\u0099\u0005#\u0012\u0002\u0093",
    "\u0099\u0005%\u0013\u0002\u0094\u0099\u0005\'\u0014\u0002\u0095\u0099",
    "\u0005)\u0015\u0002\u0096\u0097\u0007,\u0002\u0002\u0097\u0099\u0005",
    "\u0019\r\u0002\u0098\u0090\u0003\u0002\u0002\u0002\u0098\u0091\u0003",
    "\u0002\u0002\u0002\u0098\u0092\u0003\u0002\u0002\u0002\u0098\u0093\u0003",
    "\u0002\u0002\u0002\u0098\u0094\u0003\u0002\u0002\u0002\u0098\u0095\u0003",
    "\u0002\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002\u0099,\u0003",
    "\u0002\u0002\u0002\u009a\u009c\u0005\u001b\u000e\u0002\u009b\u009a\u0003",
    "\u0002\u0002\u0002\u009c\u009d\u0003\u0002\u0002\u0002\u009d\u009b\u0003",
    "\u0002\u0002\u0002\u009d\u009e\u0003\u0002\u0002\u0002\u009e.\u0003",
    "\u0002\u0002\u0002\u009f\u00a0\u0005+\u0016\u0002\u00a0\u00a1\u0005",
    "\u001d\u000f\u0002\u00a10\u0003\u0002\u0002\u0002\u00a2\u00a3\u0005",
    "\u0013\n\u0002\u00a3\u00a4\u0005\u0017\f\u0002\u00a4\u00a5\u0005\u0015",
    "\u000b\u0002\u00a52\u0003\u0002\u0002\u0002\u00a6\u00a7\u0007/\u0002",
    "\u0002\u00a7\u00a8\u0007\"\u0002\u0002\u00a84\u0003\u0002\u0002\u0002",
    "\u00a9\u00aa\u0007-\u0002\u0002\u00aa\u00ab\u0007\"\u0002\u0002\u00ab",
    "6\u0003\u0002\u0002\u0002\u00ac\u00ad\u00053\u001a\u0002\u00ad\u00ae",
    "\u0005\u001d\u000f\u0002\u00ae8\u0003\u0002\u0002\u0002\u00af\u00b0",
    "\u00055\u001b\u0002\u00b0\u00b1\u0005\u001d\u000f\u0002\u00b1:\u0003",
    "\u0002\u0002\u0002\u00b2\u00b3\u0005\u001d\u000f\u0002\u00b3<\u0003",
    "\u0002\u0002\u0002\t\u0002>afm\u0098\u009d\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function ArtlingLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

ArtlingLexer.prototype = Object.create(antlr4.Lexer.prototype);
ArtlingLexer.prototype.constructor = ArtlingLexer;

ArtlingLexer.EOF = antlr4.Token.EOF;
ArtlingLexer.NL = 1;
ArtlingLexer.TAB = 2;
ArtlingLexer.STAR = 3;
ArtlingLexer.SPACE = 4;
ArtlingLexer.MINUS = 5;
ArtlingLexer.PLUS = 6;
ArtlingLexer.ULI_START = 7;
ArtlingLexer.OLI_START = 8;
ArtlingLexer.OPEN_GEN = 9;
ArtlingLexer.CLOSE_GEN = 10;
ArtlingLexer.GEN_ID = 11;
ArtlingLexer.HEADING_SIZE = 12;
ArtlingLexer.H1_START = 13;
ArtlingLexer.H2_START = 14;
ArtlingLexer.H3_START = 15;
ArtlingLexer.H4_START = 16;
ArtlingLexer.H5_START = 17;
ArtlingLexer.H6_START = 18;
ArtlingLexer.NL_OR_EOF = 19;
ArtlingLexer.HEADING_LINE = 20;
ArtlingLexer.GEN = 21;
ArtlingLexer.UL_ITEM = 22;
ArtlingLexer.OL_ITEM = 23;
ArtlingLexer.PARA_LINE = 24;


ArtlingLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ArtlingLexer.prototype.literalNames = [ null, null, "'\t'", "'*'", "' '", 
                                        "'-'", "'+'", "'- '", "'+ '", "'(( '", 
                                        "' ))'", null, null, "'* '", "'** '", 
                                        "'*** '", "'**** '", "'***** '", 
                                        "'****** '" ];

ArtlingLexer.prototype.symbolicNames = [ null, "NL", "TAB", "STAR", "SPACE", 
                                         "MINUS", "PLUS", "ULI_START", "OLI_START", 
                                         "OPEN_GEN", "CLOSE_GEN", "GEN_ID", 
                                         "HEADING_SIZE", "H1_START", "H2_START", 
                                         "H3_START", "H4_START", "H5_START", 
                                         "H6_START", "NL_OR_EOF", "HEADING_LINE", 
                                         "GEN", "UL_ITEM", "OL_ITEM", "PARA_LINE" ];

ArtlingLexer.prototype.ruleNames = [ "NL", "TAB", "STAR", "SPACE", "MINUS", 
                                     "PLUS", "ULI_START", "OLI_START", "OPEN_GEN", 
                                     "CLOSE_GEN", "GEN_ID", "HEADING_SIZE", 
                                     "NEWLINE", "TEXT_LINE", "H1_START", 
                                     "H2_START", "H3_START", "H4_START", 
                                     "H5_START", "H6_START", "HEADING_START", 
                                     "NL_OR_EOF", "HEADING_LINE", "GEN", 
                                     "UL_ITEM_START", "OL_ITEM_START", "UL_ITEM", 
                                     "OL_ITEM", "PARA_LINE" ];

ArtlingLexer.prototype.grammarFileName = "ArtlingLexer.g4";



exports.ArtlingLexer = ArtlingLexer;

