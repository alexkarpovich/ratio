/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _ArtlingLexer = __webpack_require__(46);

	var _ArtlingLexer2 = _interopRequireDefault(_ArtlingLexer);

	var _ArtlingParser = __webpack_require__(47);

	var _ArtlingParser2 = _interopRequireDefault(_ArtlingParser);

	var _Artling = __webpack_require__(49);

	var _Artling2 = _interopRequireDefault(_Artling);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var input = '\n@ Heading 1\n@2 Heading 2\n@3 Heading 3\n@4 Heading 4\n@5 Heading 5\n@6 Heading 6\n\n';
	var chars = new _index2.default.InputStream(input);
	var lexer = new _ArtlingLexer2.default.ArtlingLexer(chars);
	var tokens = new _index2.default.CommonTokenStream(lexer);
	var parser = new _ArtlingParser2.default.ArtlingParser(tokens);

	parser.buildParseTrees = true;

	var tree = parser.content();
	console.log(tree);

	exports.default = _Artling2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	exports.atn = __webpack_require__(2);
	exports.dfa = __webpack_require__(33);
	exports.tree = __webpack_require__(36);
	exports.error = __webpack_require__(37);
	exports.Token = __webpack_require__(6).Token;
	exports.CommonToken = __webpack_require__(6).CommonToken;
	exports.InputStream = __webpack_require__(40).InputStream;
	exports.FileStream = __webpack_require__(41).FileStream;
	exports.CommonTokenStream = __webpack_require__(43).CommonTokenStream;
	exports.Lexer = __webpack_require__(22).Lexer;
	exports.Parser = __webpack_require__(45).Parser;
	var pc = __webpack_require__(12);
	exports.PredictionContextCache = pc.PredictionContextCache;
	exports.ParserRuleContext = __webpack_require__(16).ParserRuleContext;
	exports.Interval = __webpack_require__(10).Interval;
	exports.Utils = __webpack_require__(5);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	exports.ATN = __webpack_require__(3).ATN;
	exports.ATNDeserializer = __webpack_require__(17).ATNDeserializer;
	exports.LexerATNSimulator = __webpack_require__(21).LexerATNSimulator;
	exports.ParserATNSimulator = __webpack_require__(31).ParserATNSimulator;
	exports.PredictionMode = __webpack_require__(32).PredictionMode;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var LL1Analyzer = __webpack_require__(4).LL1Analyzer;
	var IntervalSet = __webpack_require__(10).IntervalSet;

	function ATN(grammarType, maxTokenType) {

	    // Used for runtime deserialization of ATNs from strings///
	    // The type of the ATN.
	    this.grammarType = grammarType;
	    // The maximum value for any symbol recognized by a transition in the ATN.
	    this.maxTokenType = maxTokenType;
	    this.states = [];
	    // Each subrule/rule is a decision point and we must track them so we
	    //  can go back later and build DFA predictors for them.  This includes
	    //  all the rules, subrules, optional blocks, ()+, ()* etc...
	    this.decisionToState = [];
	    // Maps from rule index to starting state number.
	    this.ruleToStartState = [];
	    // Maps from rule index to stop state number.
	    this.ruleToStopState = null;
	    this.modeNameToStartState = {};
	    // For lexer ATNs, this maps the rule index to the resulting token type.
	    // For parser ATNs, this maps the rule index to the generated bypass token
	    // type if the
	    // {@link ATNDeserializationOptions//isGenerateRuleBypassTransitions}
	    // deserialization option was specified; otherwise, this is {@code null}.
	    this.ruleToTokenType = null;
	    // For lexer ATNs, this is an array of {@link LexerAction} objects which may
	    // be referenced by action transitions in the ATN.
	    this.lexerActions = null;
	    this.modeToStartState = [];

	    return this;
	}

	// Compute the set of valid tokens that can occur starting in state {@code s}.
	//  If {@code ctx} is null, the set of tokens will not include what can follow
	//  the rule surrounding {@code s}. In other words, the set will be
	//  restricted to tokens reachable staying within {@code s}'s rule.
	ATN.prototype.nextTokensInContext = function (s, ctx) {
	    var anal = new LL1Analyzer(this);
	    return anal.LOOK(s, null, ctx);
	};

	// Compute the set of valid tokens that can occur starting in {@code s} and
	// staying in same rule. {@link Token//EPSILON} is in set if we reach end of
	// rule.
	ATN.prototype.nextTokensNoContext = function (s) {
	    if (s.nextTokenWithinRule !== null) {
	        return s.nextTokenWithinRule;
	    }
	    s.nextTokenWithinRule = this.nextTokensInContext(s, null);
	    s.nextTokenWithinRule.readOnly = true;
	    return s.nextTokenWithinRule;
	};

	ATN.prototype.nextTokens = function (s, ctx) {
	    if (ctx === undefined) {
	        return this.nextTokensNoContext(s);
	    } else {
	        return this.nextTokensInContext(s, ctx);
	    }
	};

	ATN.prototype.addState = function (state) {
	    if (state !== null) {
	        state.atn = this;
	        state.stateNumber = this.states.length;
	    }
	    this.states.push(state);
	};

	ATN.prototype.removeState = function (state) {
	    this.states[state.stateNumber] = null; // just free mem, don't shift states in list
	};

	ATN.prototype.defineDecisionState = function (s) {
	    this.decisionToState.push(s);
	    s.decision = this.decisionToState.length - 1;
	    return s.decision;
	};

	ATN.prototype.getDecisionState = function (decision) {
	    if (this.decisionToState.length === 0) {
	        return null;
	    } else {
	        return this.decisionToState[decision];
	    }
	};

	// Computes the set of input symbols which could follow ATN state number
	// {@code stateNumber} in the specified full {@code context}. This method
	// considers the complete parser context, but does not evaluate semantic
	// predicates (i.e. all predicates encountered during the calculation are
	// assumed true). If a path in the ATN exists from the starting state to the
	// {@link RuleStopState} of the outermost context without matching any
	// symbols, {@link Token//EOF} is added to the returned set.
	//
	// <p>If {@code context} is {@code null}, it is treated as
	// {@link ParserRuleContext//EMPTY}.</p>
	//
	// @param stateNumber the ATN state number
	// @param context the full parse context
	// @return The set of potentially valid input symbols which could follow the
	// specified state in the specified context.
	// @throws IllegalArgumentException if the ATN does not contain a state with
	// number {@code stateNumber}
	var Token = __webpack_require__(6).Token;

	ATN.prototype.getExpectedTokens = function (stateNumber, ctx) {
	    if (stateNumber < 0 || stateNumber >= this.states.length) {
	        throw "Invalid state number.";
	    }
	    var s = this.states[stateNumber];
	    var following = this.nextTokens(s);
	    if (!following.contains(Token.EPSILON)) {
	        return following;
	    }
	    var expected = new IntervalSet();
	    expected.addSet(following);
	    expected.removeOne(Token.EPSILON);
	    while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
	        var invokingState = this.states[ctx.invokingState];
	        var rt = invokingState.transitions[0];
	        following = this.nextTokens(rt.followState);
	        expected.addSet(following);
	        expected.removeOne(Token.EPSILON);
	        ctx = ctx.parentCtx;
	    }
	    if (following.contains(Token.EPSILON)) {
	        expected.addOne(Token.EOF);
	    }
	    return expected;
	};

	ATN.INVALID_ALT_NUMBER = 0;

	exports.ATN = ATN;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	var Set = __webpack_require__(5).Set;
	var BitSet = __webpack_require__(5).BitSet;
	var Token = __webpack_require__(6).Token;
	var ATNConfig = __webpack_require__(7).ATNConfig;
	var Interval = __webpack_require__(10).Interval;
	var IntervalSet = __webpack_require__(10).IntervalSet;
	var RuleStopState = __webpack_require__(8).RuleStopState;
	var RuleTransition = __webpack_require__(11).RuleTransition;
	var NotSetTransition = __webpack_require__(11).NotSetTransition;
	var WildcardTransition = __webpack_require__(11).WildcardTransition;
	var AbstractPredicateTransition = __webpack_require__(11).AbstractPredicateTransition;

	var pc = __webpack_require__(12);
	var predictionContextFromRuleContext = pc.predictionContextFromRuleContext;
	var PredictionContext = pc.PredictionContext;
	var SingletonPredictionContext = pc.SingletonPredictionContext;

	function LL1Analyzer(atn) {
	    this.atn = atn;
	}

	//* Special value added to the lookahead sets to indicate that we hit
	//  a predicate during analysis if {@code seeThruPreds==false}.
	///
	LL1Analyzer.HIT_PRED = Token.INVALID_TYPE;

	//*
	// Calculates the SLL(1) expected lookahead set for each outgoing transition
	// of an {@link ATNState}. The returned array has one element for each
	// outgoing transition in {@code s}. If the closure from transition
	// <em>i</em> leads to a semantic predicate before matching a symbol, the
	// element at index <em>i</em> of the result will be {@code null}.
	//
	// @param s the ATN state
	// @return the expected symbols for each outgoing transition of {@code s}.
	///
	LL1Analyzer.prototype.getDecisionLookahead = function (s) {
	    if (s === null) {
	        return null;
	    }
	    var count = s.transitions.length;
	    var look = [];
	    for (var alt = 0; alt < count; alt++) {
	        look[alt] = new IntervalSet();
	        var lookBusy = new Set();
	        var seeThruPreds = false; // fail to get lookahead upon pred
	        this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY, look[alt], lookBusy, new BitSet(), seeThruPreds, false);
	        // Wipe out lookahead for this alternative if we found nothing
	        // or we had a predicate when we !seeThruPreds
	        if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
	            look[alt] = null;
	        }
	    }
	    return look;
	};

	//*
	// Compute set of tokens that can follow {@code s} in the ATN in the
	// specified {@code ctx}.
	//
	// <p>If {@code ctx} is {@code null} and the end of the rule containing
	// {@code s} is reached, {@link Token//EPSILON} is added to the result set.
	// If {@code ctx} is not {@code null} and the end of the outermost rule is
	// reached, {@link Token//EOF} is added to the result set.</p>
	//
	// @param s the ATN state
	// @param stopState the ATN state to stop at. This can be a
	// {@link BlockEndState} to detect epsilon paths through a closure.
	// @param ctx the complete parser context, or {@code null} if the context
	// should be ignored
	//
	// @return The set of tokens that can follow {@code s} in the ATN in the
	// specified {@code ctx}.
	///
	LL1Analyzer.prototype.LOOK = function (s, stopState, ctx) {
	    var r = new IntervalSet();
	    var seeThruPreds = true; // ignore preds; get all lookahead
	    ctx = ctx || null;
	    var lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;
	    this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);
	    return r;
	};

	//*
	// Compute set of tokens that can follow {@code s} in the ATN in the
	// specified {@code ctx}.
	//
	// <p>If {@code ctx} is {@code null} and {@code stopState} or the end of the
	// rule containing {@code s} is reached, {@link Token//EPSILON} is added to
	// the result set. If {@code ctx} is not {@code null} and {@code addEOF} is
	// {@code true} and {@code stopState} or the end of the outermost rule is
	// reached, {@link Token//EOF} is added to the result set.</p>
	//
	// @param s the ATN state.
	// @param stopState the ATN state to stop at. This can be a
	// {@link BlockEndState} to detect epsilon paths through a closure.
	// @param ctx The outer context, or {@code null} if the outer context should
	// not be used.
	// @param look The result lookahead set.
	// @param lookBusy A set used for preventing epsilon closures in the ATN
	// from causing a stack overflow. Outside code should pass
	// {@code new Set<ATNConfig>} for this argument.
	// @param calledRuleStack A set used for preventing left recursion in the
	// ATN from causing a stack overflow. Outside code should pass
	// {@code new BitSet()} for this argument.
	// @param seeThruPreds {@code true} to true semantic predicates as
	// implicitly {@code true} and "see through them", otherwise {@code false}
	// to treat semantic predicates as opaque and add {@link //HIT_PRED} to the
	// result if one is encountered.
	// @param addEOF Add {@link Token//EOF} to the result if the end of the
	// outermost context is reached. This parameter has no effect if {@code ctx}
	// is {@code null}.
	///
	LL1Analyzer.prototype._LOOK = function (s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
	    var c = new ATNConfig({ state: s, alt: 0, context: ctx }, null);
	    if (lookBusy.contains(c)) {
	        return;
	    }
	    lookBusy.add(c);
	    if (s === stopState) {
	        if (ctx === null) {
	            look.addOne(Token.EPSILON);
	            return;
	        } else if (ctx.isEmpty() && addEOF) {
	            look.addOne(Token.EOF);
	            return;
	        }
	    }
	    if (s instanceof RuleStopState) {
	        if (ctx === null) {
	            look.addOne(Token.EPSILON);
	            return;
	        } else if (ctx.isEmpty() && addEOF) {
	            look.addOne(Token.EOF);
	            return;
	        }
	        if (ctx !== PredictionContext.EMPTY) {
	            // run thru all possible stack tops in ctx
	            for (var i = 0; i < ctx.length; i++) {
	                var returnState = this.atn.states[ctx.getReturnState(i)];
	                var removed = calledRuleStack.contains(returnState.ruleIndex);
	                try {
	                    calledRuleStack.remove(returnState.ruleIndex);
	                    this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
	                } finally {
	                    if (removed) {
	                        calledRuleStack.add(returnState.ruleIndex);
	                    }
	                }
	            }
	            return;
	        }
	    }
	    for (var j = 0; j < s.transitions.length; j++) {
	        var t = s.transitions[j];
	        if (t.constructor === RuleTransition) {
	            if (calledRuleStack.contains(t.target.ruleIndex)) {
	                continue;
	            }
	            var newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);
	            try {
	                calledRuleStack.add(t.target.ruleIndex);
	                this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
	            } finally {
	                calledRuleStack.remove(t.target.ruleIndex);
	            }
	        } else if (t instanceof AbstractPredicateTransition) {
	            if (seeThruPreds) {
	                this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
	            } else {
	                look.addOne(LL1Analyzer.HIT_PRED);
	            }
	        } else if (t.isEpsilon) {
	            this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
	        } else if (t.constructor === WildcardTransition) {
	            look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
	        } else {
	            var set = t.label;
	            if (set !== null) {
	                if (t instanceof NotSetTransition) {
	                    set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
	                }
	                look.addSet(set);
	            }
	        }
	    }
	};

	exports.LL1Analyzer = LL1Analyzer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	function arrayToString(a) {
	    return "[" + a.join(", ") + "]";
	}

	String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));

	String.prototype.hashCode = function () {
	    var remainder,
	        bytes,
	        h1,
	        h1b,
	        c1,
	        c1b,
	        c2,
	        c2b,
	        k1,
	        i,
	        key = this.toString();

	    remainder = key.length & 3; // key.length % 4
	    bytes = key.length - remainder;
	    h1 = String.prototype.seed;
	    c1 = 0xcc9e2d51;
	    c2 = 0x1b873593;
	    i = 0;

	    while (i < bytes) {
	        k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;
	        ++i;

	        k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
	        k1 = k1 << 15 | k1 >>> 17;
	        k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;

	        h1 ^= k1;
	        h1 = h1 << 13 | h1 >>> 19;
	        h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
	        h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
	    }

	    k1 = 0;

	    switch (remainder) {
	        case 3:
	            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
	        case 2:
	            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
	        case 1:
	            k1 ^= key.charCodeAt(i) & 0xff;

	            k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
	            k1 = k1 << 15 | k1 >>> 17;
	            k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
	            h1 ^= k1;
	    }

	    h1 ^= key.length;

	    h1 ^= h1 >>> 16;
	    h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
	    h1 ^= h1 >>> 13;
	    h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
	    h1 ^= h1 >>> 16;

	    return h1 >>> 0;
	};

	function standardEqualsFunction(a, b) {
	    return a.equals(b);
	}

	function standardHashCodeFunction(a) {
	    return a.hashCode();
	}

	function Set(hashFunction, equalsFunction) {
	    this.data = {};
	    this.hashFunction = hashFunction || standardHashCodeFunction;
	    this.equalsFunction = equalsFunction || standardEqualsFunction;
	    return this;
	}

	Object.defineProperty(Set.prototype, "length", {
	    get: function get() {
	        var l = 0;
	        for (var key in this.data) {
	            if (key.indexOf("hash_") === 0) {
	                l = l + this.data[key].length;
	            }
	        }
	        return l;
	    }
	});

	Set.prototype.add = function (value) {
	    var hash = this.hashFunction(value);
	    var key = "hash_" + hash;
	    if (key in this.data) {
	        var values = this.data[key];
	        for (var i = 0; i < values.length; i++) {
	            if (this.equalsFunction(value, values[i])) {
	                return values[i];
	            }
	        }
	        values.push(value);
	        return value;
	    } else {
	        this.data[key] = [value];
	        return value;
	    }
	};

	Set.prototype.contains = function (value) {
	    return this.get(value) != null;
	};

	Set.prototype.get = function (value) {
	    var hash = this.hashFunction(value);
	    var key = "hash_" + hash;
	    if (key in this.data) {
	        var values = this.data[key];
	        for (var i = 0; i < values.length; i++) {
	            if (this.equalsFunction(value, values[i])) {
	                return values[i];
	            }
	        }
	    }
	    return null;
	};

	Set.prototype.values = function () {
	    var l = [];
	    for (var key in this.data) {
	        if (key.indexOf("hash_") === 0) {
	            l = l.concat(this.data[key]);
	        }
	    }
	    return l;
	};

	Set.prototype.toString = function () {
	    return arrayToString(this.values());
	};

	function BitSet() {
	    this.data = [];
	    return this;
	}

	BitSet.prototype.add = function (value) {
	    this.data[value] = true;
	};

	BitSet.prototype.or = function (set) {
	    var bits = this;
	    Object.keys(set.data).map(function (alt) {
	        bits.add(alt);
	    });
	};

	BitSet.prototype.remove = function (value) {
	    delete this.data[value];
	};

	BitSet.prototype.contains = function (value) {
	    return this.data[value] === true;
	};

	BitSet.prototype.values = function () {
	    return Object.keys(this.data);
	};

	BitSet.prototype.minValue = function () {
	    return Math.min.apply(null, this.values());
	};

	BitSet.prototype.hashCode = function () {
	    var hash = new Hash();
	    hash.update(this.values());
	    return hash.finish();
	};

	BitSet.prototype.equals = function (other) {
	    if (!(other instanceof BitSet)) {
	        return false;
	    }
	    return this.hashCode() === other.hashCode();
	};

	Object.defineProperty(BitSet.prototype, "length", {
	    get: function get() {
	        return this.values().length;
	    }
	});

	BitSet.prototype.toString = function () {
	    return "{" + this.values().join(", ") + "}";
	};

	function Map(hashFunction, equalsFunction) {
	    this.data = {};
	    this.hashFunction = hashFunction || standardHashCodeFunction;
	    this.equalsFunction = equalsFunction || standardEqualsFunction;
	    return this;
	}

	Object.defineProperty(Map.prototype, "length", {
	    get: function get() {
	        var l = 0;
	        for (var hashKey in this.data) {
	            if (hashKey.indexOf("hash_") === 0) {
	                l = l + this.data[hashKey].length;
	            }
	        }
	        return l;
	    }
	});

	Map.prototype.put = function (key, value) {
	    var hashKey = "hash_" + this.hashFunction(key);
	    if (hashKey in this.data) {
	        var entries = this.data[hashKey];
	        for (var i = 0; i < entries.length; i++) {
	            var entry = entries[i];
	            if (this.equalsFunction(key, entry.key)) {
	                var oldValue = entry.value;
	                entry.value = value;
	                return oldValue;
	            }
	        }
	        entries.push({ key: key, value: value });
	        return value;
	    } else {
	        this.data[hashKey] = [{ key: key, value: value }];
	        return value;
	    }
	};

	Map.prototype.containsKey = function (key) {
	    var hashKey = "hash_" + this.hashFunction(key);
	    if (hashKey in this.data) {
	        var entries = this.data[hashKey];
	        for (var i = 0; i < entries.length; i++) {
	            var entry = entries[i];
	            if (this.equalsFunction(key, entry.key)) return true;
	        }
	    }
	    return false;
	};

	Map.prototype.get = function (key) {
	    var hashKey = "hash_" + this.hashFunction(key);
	    if (hashKey in this.data) {
	        var entries = this.data[hashKey];
	        for (var i = 0; i < entries.length; i++) {
	            var entry = entries[i];
	            if (this.equalsFunction(key, entry.key)) return entry.value;
	        }
	    }
	    return null;
	};

	Map.prototype.entries = function () {
	    var l = [];
	    for (var key in this.data) {
	        if (key.indexOf("hash_") === 0) {
	            l = l.concat(this.data[key]);
	        }
	    }
	    return l;
	};

	Map.prototype.getKeys = function () {
	    return this.entries().map(function (e) {
	        return e.key;
	    });
	};

	Map.prototype.getValues = function () {
	    return this.entries().map(function (e) {
	        return e.value;
	    });
	};

	Map.prototype.toString = function () {
	    var ss = this.entries().map(function (entry) {
	        return '{' + entry.key + ':' + entry.value + '}';
	    });
	    return '[' + ss.join(", ") + ']';
	};

	function AltDict() {
	    this.data = {};
	    return this;
	}

	AltDict.prototype.get = function (key) {
	    key = "k-" + key;
	    if (key in this.data) {
	        return this.data[key];
	    } else {
	        return null;
	    }
	};

	AltDict.prototype.put = function (key, value) {
	    key = "k-" + key;
	    this.data[key] = value;
	};

	AltDict.prototype.values = function () {
	    var data = this.data;
	    var keys = Object.keys(this.data);
	    return keys.map(function (key) {
	        return data[key];
	    });
	};

	function DoubleDict() {
	    return this;
	}

	function Hash() {
	    this.count = 0;
	    this.hash = 0;
	    return this;
	}

	Hash.prototype.update = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        var value = arguments[i];
	        if (value == null) continue;
	        if (Array.isArray(value)) this.update.apply(value);else {
	            var k = 0;
	            switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
	                case 'undefined':
	                case 'function':
	                    continue;
	                case 'number':
	                case 'boolean':
	                    k = value;
	                    break;
	                case 'string':
	                    k = value.hashCode();
	                    break;
	                default:
	                    value.updateHashCode(this);
	                    continue;
	            }
	            k = k * 0xCC9E2D51;
	            k = k << 15 | k >>> 32 - 15;
	            k = k * 0x1B873593;
	            this.count = this.count + 1;
	            hash = this.hash ^ k;
	            hash = hash << 13 | hash >>> 32 - 13;
	            hash = hash * 5 + 0xE6546B64;
	            this.hash = hash;
	        }
	    }
	};

	Hash.prototype.finish = function () {
	    var hash = this.hash ^ this.count * 4;
	    hash = hash ^ hash >>> 16;
	    hash = hash * 0x85EBCA6B;
	    hash = hash ^ hash >>> 13;
	    hash = hash * 0xC2B2AE35;
	    hash = hash ^ hash >>> 16;
	    return hash;
	};

	function hashStuff() {
	    var hash = new Hash();
	    hash.update.apply(arguments);
	    return hash.finish();
	}

	DoubleDict.prototype.get = function (a, b) {
	    var d = this[a] || null;
	    return d === null ? null : d[b] || null;
	};

	DoubleDict.prototype.set = function (a, b, o) {
	    var d = this[a] || null;
	    if (d === null) {
	        d = {};
	        this[a] = d;
	    }
	    d[b] = o;
	};

	function escapeWhitespace(s, escapeSpaces) {
	    s = s.replace("\t", "\\t");
	    s = s.replace("\n", "\\n");
	    s = s.replace("\r", "\\r");
	    if (escapeSpaces) {
	        s = s.replace(" ", "\xB7");
	    }
	    return s;
	}

	function titleCase(str) {
	    return str.replace(/\w\S*/g, function (txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1);
	    });
	};

	function equalArrays(a, b) {
	    if (!Array.isArray(a) || !Array.isArray(b)) return false;
	    if (a == b) return true;
	    if (a.length != b.length) return false;
	    for (var i = 0; i < a.length; i++) {
	        if (a[i] == b[i]) continue;
	        if (!a[i].equals(b[i])) return false;
	    }
	    return true;
	};

	exports.Hash = Hash;
	exports.Set = Set;
	exports.Map = Map;
	exports.BitSet = BitSet;
	exports.AltDict = AltDict;
	exports.DoubleDict = DoubleDict;
	exports.hashStuff = hashStuff;
	exports.escapeWhitespace = escapeWhitespace;
	exports.arrayToString = arrayToString;
	exports.titleCase = titleCase;
	exports.equalArrays = equalArrays;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	// A token has properties: text, type, line, character position in the line
	// (so we can ignore tabs), token channel, index, and source from which
	// we obtained this token.

	function Token() {
		this.source = null;
		this.type = null; // token type of the token
		this.channel = null; // The parser ignores everything not on DEFAULT_CHANNEL
		this.start = null; // optional; return -1 if not implemented.
		this.stop = null; // optional; return -1 if not implemented.
		this.tokenIndex = null; // from 0..n-1 of the token object in the input stream
		this.line = null; // line=1..n of the 1st character
		this.column = null; // beginning of the line at which it occurs, 0..n-1
		this._text = null; // text of the token.
		return this;
	}

	Token.INVALID_TYPE = 0;

	// During lookahead operations, this "token" signifies we hit rule end ATN state
	// and did not follow it despite needing to.
	Token.EPSILON = -2;

	Token.MIN_USER_TOKEN_TYPE = 1;

	Token.EOF = -1;

	// All tokens go to the parser (unless skip() is called in that rule)
	// on a particular "channel". The parser tunes to a particular channel
	// so that whitespace etc... can go to the parser on a "hidden" channel.

	Token.DEFAULT_CHANNEL = 0;

	// Anything on different channel than DEFAULT_CHANNEL is not parsed
	// by parser.

	Token.HIDDEN_CHANNEL = 1;

	// Explicitly set the text for this token. If {code text} is not
	// {@code null}, then {@link //getText} will return this value rather than
	// extracting the text from the input.
	//
	// @param text The explicit text of the token, or {@code null} if the text
	// should be obtained from the input along with the start and stop indexes
	// of the token.

	Object.defineProperty(Token.prototype, "text", {
		get: function get() {
			return this._text;
		},
		set: function set(text) {
			this._text = text;
		}
	});

	Token.prototype.getTokenSource = function () {
		return this.source[0];
	};

	Token.prototype.getInputStream = function () {
		return this.source[1];
	};

	function CommonToken(source, type, channel, start, stop) {
		Token.call(this);
		this.source = source !== undefined ? source : CommonToken.EMPTY_SOURCE;
		this.type = type !== undefined ? type : null;
		this.channel = channel !== undefined ? channel : Token.DEFAULT_CHANNEL;
		this.start = start !== undefined ? start : -1;
		this.stop = stop !== undefined ? stop : -1;
		this.tokenIndex = -1;
		if (this.source[0] !== null) {
			this.line = source[0].line;
			this.column = source[0].column;
		} else {
			this.column = -1;
		}
		return this;
	}

	CommonToken.prototype = Object.create(Token.prototype);
	CommonToken.prototype.constructor = CommonToken;

	// An empty {@link Pair} which is used as the default value of
	// {@link //source} for tokens that do not have a source.
	CommonToken.EMPTY_SOURCE = [null, null];

	// Constructs a new {@link CommonToken} as a copy of another {@link Token}.
	//
	// <p>
	// If {@code oldToken} is also a {@link CommonToken} instance, the newly
	// constructed token will share a reference to the {@link //text} field and
	// the {@link Pair} stored in {@link //source}. Otherwise, {@link //text} will
	// be assigned the result of calling {@link //getText}, and {@link //source}
	// will be constructed from the result of {@link Token//getTokenSource} and
	// {@link Token//getInputStream}.</p>
	//
	// @param oldToken The token to copy.
	//
	CommonToken.prototype.clone = function () {
		var t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
		t.tokenIndex = this.tokenIndex;
		t.line = this.line;
		t.column = this.column;
		t.text = this.text;
		return t;
	};

	Object.defineProperty(CommonToken.prototype, "text", {
		get: function get() {
			if (this._text !== null) {
				return this._text;
			}
			var input = this.getInputStream();
			if (input === null) {
				return null;
			}
			var n = input.size;
			if (this.start < n && this.stop < n) {
				return input.getText(this.start, this.stop);
			} else {
				return "<EOF>";
			}
		},
		set: function set(text) {
			this._text = text;
		}
	});

	CommonToken.prototype.toString = function () {
		var txt = this.text;
		if (txt !== null) {
			txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
		} else {
			txt = "<no text>";
		}
		return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
	};

	exports.Token = Token;
	exports.CommonToken = CommonToken;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// A tuple: (ATN state, predicted alt, syntactic, semantic context).
	//  The syntactic context is a graph-structured stack node whose
	//  path(s) to the root is the rule invocation(s)
	//  chain used to arrive at the state.  The semantic context is
	//  the tree of semantic predicates encountered before reaching
	//  an ATN state.
	///

	var DecisionState = __webpack_require__(8).DecisionState;
	var SemanticContext = __webpack_require__(9).SemanticContext;
	var Hash = __webpack_require__(5).Hash;

	function checkParams(params, isCfg) {
	    if (params === null) {
	        var result = { state: null, alt: null, context: null, semanticContext: null };
	        if (isCfg) {
	            result.reachesIntoOuterContext = 0;
	        }
	        return result;
	    } else {
	        var props = {};
	        props.state = params.state || null;
	        props.alt = params.alt === undefined ? null : params.alt;
	        props.context = params.context || null;
	        props.semanticContext = params.semanticContext || null;
	        if (isCfg) {
	            props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
	            props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
	        }
	        return props;
	    }
	}

	function ATNConfig(params, config) {
	    this.checkContext(params, config);
	    params = checkParams(params);
	    config = checkParams(config, true);
	    // The ATN state associated with this configuration///
	    this.state = params.state !== null ? params.state : config.state;
	    // What alt (or lexer rule) is predicted by this configuration///
	    this.alt = params.alt !== null ? params.alt : config.alt;
	    // The stack of invoking states leading to the rule/states associated
	    //  with this config.  We track only those contexts pushed during
	    //  execution of the ATN simulator.
	    this.context = params.context !== null ? params.context : config.context;
	    this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE;
	    // We cannot execute predicates dependent upon local context unless
	    // we know for sure we are in the correct context. Because there is
	    // no way to do this efficiently, we simply cannot evaluate
	    // dependent predicates unless we are in the rule that initially
	    // invokes the ATN simulator.
	    //
	    // closure() tracks the depth of how far we dip into the
	    // outer context: depth &gt; 0.  Note that it may not be totally
	    // accurate depth since I don't ever decrement. TODO: make it a boolean then
	    this.reachesIntoOuterContext = config.reachesIntoOuterContext;
	    this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
	    return this;
	}

	ATNConfig.prototype.checkContext = function (params, config) {
	    if ((params.context === null || params.context === undefined) && (config === null || config.context === null || config.context === undefined)) {
	        this.context = null;
	    }
	};

	ATNConfig.prototype.hashCode = function () {
	    var hash = new Hash();
	    this.updateHashCode(hash);
	    return hash.finish();
	};

	ATNConfig.prototype.updateHashCode = function (hash) {
	    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
	};

	// An ATN configuration is equal to another if both have
	//  the same state, they predict the same alternative, and
	//  syntactic/semantic contexts are the same.

	ATNConfig.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof ATNConfig)) {
	        return false;
	    } else {
	        return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
	    }
	};

	ATNConfig.prototype.hashCodeForConfigSet = function () {
	    var hash = new Hash();
	    hash.update(this.state.stateNumber, this.alt, this.semanticContext);
	    return hash.finish();
	};

	ATNConfig.prototype.equalsForConfigSet = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof ATNConfig)) {
	        return false;
	    } else {
	        return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
	    }
	};

	ATNConfig.prototype.toString = function () {
	    return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
	};

	function LexerATNConfig(params, config) {
	    ATNConfig.call(this, params, config);

	    // This is the backing field for {@link //getLexerActionExecutor}.
	    var lexerActionExecutor = params.lexerActionExecutor || null;
	    this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
	    this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
	    return this;
	}

	LexerATNConfig.prototype = Object.create(ATNConfig.prototype);
	LexerATNConfig.prototype.constructor = LexerATNConfig;

	LexerATNConfig.prototype.updateHashCode = function (hash) {
	    hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
	};

	LexerATNConfig.prototype.equals = function (other) {
	    return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision == other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && ATNConfig.prototype.equals.call(this, other);
	};

	LexerATNConfig.prototype.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;

	LexerATNConfig.prototype.equalsForConfigSet = LexerATNConfig.prototype.equals;

	LexerATNConfig.prototype.checkNonGreedyDecision = function (source, target) {
	    return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
	};

	exports.ATNConfig = ATNConfig;
	exports.LexerATNConfig = LexerATNConfig;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	// The following images show the relation of states and
	// {@link ATNState//transitions} for various grammar constructs.
	//
	// <ul>
	//
	// <li>Solid edges marked with an &//0949; indicate a required
	// {@link EpsilonTransition}.</li>
	//
	// <li>Dashed edges indicate locations where any transition derived from
	// {@link Transition} might appear.</li>
	//
	// <li>Dashed nodes are place holders for either a sequence of linked
	// {@link BasicState} states or the inclusion of a block representing a nested
	// construct in one of the forms below.</li>
	//
	// <li>Nodes showing multiple outgoing alternatives with a {@code ...} support
	// any number of alternatives (one or more). Nodes without the {@code ...} only
	// support the exact number of alternatives shown in the diagram.</li>
	//
	// </ul>
	//
	// <h2>Basic Blocks</h2>
	//
	// <h3>Rule</h3>
	//
	// <embed src="images/Rule.svg" type="image/svg+xml"/>
	//
	// <h3>Block of 1 or more alternatives</h3>
	//
	// <embed src="images/Block.svg" type="image/svg+xml"/>
	//
	// <h2>Greedy Loops</h2>
	//
	// <h3>Greedy Closure: {@code (...)*}</h3>
	//
	// <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
	//
	// <h3>Greedy Positive Closure: {@code (...)+}</h3>
	//
	// <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
	//
	// <h3>Greedy Optional: {@code (...)?}</h3>
	//
	// <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
	//
	// <h2>Non-Greedy Loops</h2>
	//
	// <h3>Non-Greedy Closure: {@code (...)*?}</h3>
	//
	// <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
	//
	// <h3>Non-Greedy Positive Closure: {@code (...)+?}</h3>
	//
	// <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
	//
	// <h3>Non-Greedy Optional: {@code (...)??}</h3>
	//
	// <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
	//

	var INITIAL_NUM_TRANSITIONS = 4;

	function ATNState() {
	  // Which ATN are we in?
	  this.atn = null;
	  this.stateNumber = ATNState.INVALID_STATE_NUMBER;
	  this.stateType = null;
	  this.ruleIndex = 0; // at runtime, we don't have Rule objects
	  this.epsilonOnlyTransitions = false;
	  // Track the transitions emanating from this ATN state.
	  this.transitions = [];
	  // Used to cache lookahead during parsing, not used during construction
	  this.nextTokenWithinRule = null;
	  return this;
	}

	// constants for serialization
	ATNState.INVALID_TYPE = 0;
	ATNState.BASIC = 1;
	ATNState.RULE_START = 2;
	ATNState.BLOCK_START = 3;
	ATNState.PLUS_BLOCK_START = 4;
	ATNState.STAR_BLOCK_START = 5;
	ATNState.TOKEN_START = 6;
	ATNState.RULE_STOP = 7;
	ATNState.BLOCK_END = 8;
	ATNState.STAR_LOOP_BACK = 9;
	ATNState.STAR_LOOP_ENTRY = 10;
	ATNState.PLUS_LOOP_BACK = 11;
	ATNState.LOOP_END = 12;

	ATNState.serializationNames = ["INVALID", "BASIC", "RULE_START", "BLOCK_START", "PLUS_BLOCK_START", "STAR_BLOCK_START", "TOKEN_START", "RULE_STOP", "BLOCK_END", "STAR_LOOP_BACK", "STAR_LOOP_ENTRY", "PLUS_LOOP_BACK", "LOOP_END"];

	ATNState.INVALID_STATE_NUMBER = -1;

	ATNState.prototype.toString = function () {
	  return this.stateNumber;
	};

	ATNState.prototype.equals = function (other) {
	  if (other instanceof ATNState) {
	    return this.stateNumber === other.stateNumber;
	  } else {
	    return false;
	  }
	};

	ATNState.prototype.isNonGreedyExitState = function () {
	  return false;
	};

	ATNState.prototype.addTransition = function (trans, index) {
	  if (index === undefined) {
	    index = -1;
	  }
	  if (this.transitions.length === 0) {
	    this.epsilonOnlyTransitions = trans.isEpsilon;
	  } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
	    this.epsilonOnlyTransitions = false;
	  }
	  if (index === -1) {
	    this.transitions.push(trans);
	  } else {
	    this.transitions.splice(index, 1, trans);
	  }
	};

	function BasicState() {
	  ATNState.call(this);
	  this.stateType = ATNState.BASIC;
	  return this;
	}

	BasicState.prototype = Object.create(ATNState.prototype);
	BasicState.prototype.constructor = BasicState;

	function DecisionState() {
	  ATNState.call(this);
	  this.decision = -1;
	  this.nonGreedy = false;
	  return this;
	}

	DecisionState.prototype = Object.create(ATNState.prototype);
	DecisionState.prototype.constructor = DecisionState;

	//  The start of a regular {@code (...)} block.
	function BlockStartState() {
	  DecisionState.call(this);
	  this.endState = null;
	  return this;
	}

	BlockStartState.prototype = Object.create(DecisionState.prototype);
	BlockStartState.prototype.constructor = BlockStartState;

	function BasicBlockStartState() {
	  BlockStartState.call(this);
	  this.stateType = ATNState.BLOCK_START;
	  return this;
	}

	BasicBlockStartState.prototype = Object.create(BlockStartState.prototype);
	BasicBlockStartState.prototype.constructor = BasicBlockStartState;

	// Terminal node of a simple {@code (a|b|c)} block.
	function BlockEndState() {
	  ATNState.call(this);
	  this.stateType = ATNState.BLOCK_END;
	  this.startState = null;
	  return this;
	}

	BlockEndState.prototype = Object.create(ATNState.prototype);
	BlockEndState.prototype.constructor = BlockEndState;

	// The last node in the ATN for a rule, unless that rule is the start symbol.
	//  In that case, there is one transition to EOF. Later, we might encode
	//  references to all calls to this rule to compute FOLLOW sets for
	//  error handling.
	//
	function RuleStopState() {
	  ATNState.call(this);
	  this.stateType = ATNState.RULE_STOP;
	  return this;
	}

	RuleStopState.prototype = Object.create(ATNState.prototype);
	RuleStopState.prototype.constructor = RuleStopState;

	function RuleStartState() {
	  ATNState.call(this);
	  this.stateType = ATNState.RULE_START;
	  this.stopState = null;
	  this.isPrecedenceRule = false;
	  return this;
	}

	RuleStartState.prototype = Object.create(ATNState.prototype);
	RuleStartState.prototype.constructor = RuleStartState;

	// Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
	//  one to the loop back to start of the block and one to exit.
	//
	function PlusLoopbackState() {
	  DecisionState.call(this);
	  this.stateType = ATNState.PLUS_LOOP_BACK;
	  return this;
	}

	PlusLoopbackState.prototype = Object.create(DecisionState.prototype);
	PlusLoopbackState.prototype.constructor = PlusLoopbackState;

	// Start of {@code (A|B|...)+} loop. Technically a decision state, but
	//  we don't use for code generation; somebody might need it, so I'm defining
	//  it for completeness. In reality, the {@link PlusLoopbackState} node is the
	//  real decision-making note for {@code A+}.
	//
	function PlusBlockStartState() {
	  BlockStartState.call(this);
	  this.stateType = ATNState.PLUS_BLOCK_START;
	  this.loopBackState = null;
	  return this;
	}

	PlusBlockStartState.prototype = Object.create(BlockStartState.prototype);
	PlusBlockStartState.prototype.constructor = PlusBlockStartState;

	// The block that begins a closure loop.
	function StarBlockStartState() {
	  BlockStartState.call(this);
	  this.stateType = ATNState.STAR_BLOCK_START;
	  return this;
	}

	StarBlockStartState.prototype = Object.create(BlockStartState.prototype);
	StarBlockStartState.prototype.constructor = StarBlockStartState;

	function StarLoopbackState() {
	  ATNState.call(this);
	  this.stateType = ATNState.STAR_LOOP_BACK;
	  return this;
	}

	StarLoopbackState.prototype = Object.create(ATNState.prototype);
	StarLoopbackState.prototype.constructor = StarLoopbackState;

	function StarLoopEntryState() {
	  DecisionState.call(this);
	  this.stateType = ATNState.STAR_LOOP_ENTRY;
	  this.loopBackState = null;
	  // Indicates whether this state can benefit from a precedence DFA during SLL decision making.
	  this.isPrecedenceDecision = null;
	  return this;
	}

	StarLoopEntryState.prototype = Object.create(DecisionState.prototype);
	StarLoopEntryState.prototype.constructor = StarLoopEntryState;

	// Mark the end of a * or + loop.
	function LoopEndState() {
	  ATNState.call(this);
	  this.stateType = ATNState.LOOP_END;
	  this.loopBackState = null;
	  return this;
	}

	LoopEndState.prototype = Object.create(ATNState.prototype);
	LoopEndState.prototype.constructor = LoopEndState;

	// The Tokens rule start state linking to each lexer rule start state */
	function TokensStartState() {
	  DecisionState.call(this);
	  this.stateType = ATNState.TOKEN_START;
	  return this;
	}

	TokensStartState.prototype = Object.create(DecisionState.prototype);
	TokensStartState.prototype.constructor = TokensStartState;

	exports.ATNState = ATNState;
	exports.BasicState = BasicState;
	exports.DecisionState = DecisionState;
	exports.BlockStartState = BlockStartState;
	exports.BlockEndState = BlockEndState;
	exports.LoopEndState = LoopEndState;
	exports.RuleStartState = RuleStartState;
	exports.RuleStopState = RuleStopState;
	exports.TokensStartState = TokensStartState;
	exports.PlusLoopbackState = PlusLoopbackState;
	exports.StarLoopbackState = StarLoopbackState;
	exports.StarLoopEntryState = StarLoopEntryState;
	exports.PlusBlockStartState = PlusBlockStartState;
	exports.StarBlockStartState = StarBlockStartState;
	exports.BasicBlockStartState = BasicBlockStartState;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	// A tree structure used to record the semantic context in which
	//  an ATN configuration is valid.  It's either a single predicate,
	//  a conjunction {@code p1&&p2}, or a sum of products {@code p1||p2}.
	//
	//  <p>I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
	//  {@link SemanticContext} within the scope of this outer class.</p>
	//

	var Set = __webpack_require__(5).Set;
	var Hash = __webpack_require__(5).Hash;

	function SemanticContext() {
		return this;
	}

	SemanticContext.prototype.hashCode = function () {
		var hash = new Hash();
		this.updateHashCode(hash);
		return hash.finish();
	};

	// For context independent predicates, we evaluate them without a local
	// context (i.e., null context). That way, we can evaluate them without
	// having to create proper rule-specific context during prediction (as
	// opposed to the parser, which creates them naturally). In a practical
	// sense, this avoids a cast exception from RuleContext to myruleContext.
	//
	// <p>For context dependent predicates, we must pass in a local context so that
	// references such as $arg evaluate properly as _localctx.arg. We only
	// capture context dependent predicates in the context in which we begin
	// prediction, so we passed in the outer context here in case of context
	// dependent predicate evaluation.</p>
	//
	SemanticContext.prototype.evaluate = function (parser, outerContext) {};

	//
	// Evaluate the precedence predicates for the context and reduce the result.
	//
	// @param parser The parser instance.
	// @param outerContext The current parser context object.
	// @return The simplified semantic context after precedence predicates are
	// evaluated, which will be one of the following values.
	// <ul>
	// <li>{@link //NONE}: if the predicate simplifies to {@code true} after
	// precedence predicates are evaluated.</li>
	// <li>{@code null}: if the predicate simplifies to {@code false} after
	// precedence predicates are evaluated.</li>
	// <li>{@code this}: if the semantic context is not changed as a result of
	// precedence predicate evaluation.</li>
	// <li>A non-{@code null} {@link SemanticContext}: the new simplified
	// semantic context after precedence predicates are evaluated.</li>
	// </ul>
	//
	SemanticContext.prototype.evalPrecedence = function (parser, outerContext) {
		return this;
	};

	SemanticContext.andContext = function (a, b) {
		if (a === null || a === SemanticContext.NONE) {
			return b;
		}
		if (b === null || b === SemanticContext.NONE) {
			return a;
		}
		var result = new AND(a, b);
		if (result.opnds.length === 1) {
			return result.opnds[0];
		} else {
			return result;
		}
	};

	SemanticContext.orContext = function (a, b) {
		if (a === null) {
			return b;
		}
		if (b === null) {
			return a;
		}
		if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
			return SemanticContext.NONE;
		}
		var result = new OR(a, b);
		if (result.opnds.length === 1) {
			return result.opnds[0];
		} else {
			return result;
		}
	};

	function Predicate(ruleIndex, predIndex, isCtxDependent) {
		SemanticContext.call(this);
		this.ruleIndex = ruleIndex === undefined ? -1 : ruleIndex;
		this.predIndex = predIndex === undefined ? -1 : predIndex;
		this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred
		return this;
	}

	Predicate.prototype = Object.create(SemanticContext.prototype);
	Predicate.prototype.constructor = Predicate;

	//The default {@link SemanticContext}, which is semantically equivalent to
	//a predicate of the form {@code {true}?}.
	//
	SemanticContext.NONE = new Predicate();

	Predicate.prototype.evaluate = function (parser, outerContext) {
		var localctx = this.isCtxDependent ? outerContext : null;
		return parser.sempred(localctx, this.ruleIndex, this.predIndex);
	};

	Predicate.prototype.updateHashCode = function (hash) {
		hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
	};

	Predicate.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof Predicate)) {
			return false;
		} else {
			return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
		}
	};

	Predicate.prototype.toString = function () {
		return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
	};

	function PrecedencePredicate(precedence) {
		SemanticContext.call(this);
		this.precedence = precedence === undefined ? 0 : precedence;
	}

	PrecedencePredicate.prototype = Object.create(SemanticContext.prototype);
	PrecedencePredicate.prototype.constructor = PrecedencePredicate;

	PrecedencePredicate.prototype.evaluate = function (parser, outerContext) {
		return parser.precpred(outerContext, this.precedence);
	};

	PrecedencePredicate.prototype.evalPrecedence = function (parser, outerContext) {
		if (parser.precpred(outerContext, this.precedence)) {
			return SemanticContext.NONE;
		} else {
			return null;
		}
	};

	PrecedencePredicate.prototype.compareTo = function (other) {
		return this.precedence - other.precedence;
	};

	PrecedencePredicate.prototype.updateHashCode = function (hash) {
		hash.update(31);
	};

	PrecedencePredicate.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof PrecedencePredicate)) {
			return false;
		} else {
			return this.precedence === other.precedence;
		}
	};

	PrecedencePredicate.prototype.toString = function () {
		return "{" + this.precedence + ">=prec}?";
	};

	PrecedencePredicate.filterPrecedencePredicates = function (set) {
		var result = [];
		set.values().map(function (context) {
			if (context instanceof PrecedencePredicate) {
				result.push(context);
			}
		});
		return result;
	};

	// A semantic context which is true whenever none of the contained contexts
	// is false.
	//
	function AND(a, b) {
		SemanticContext.call(this);
		var operands = new Set();
		if (a instanceof AND) {
			a.opnds.map(function (o) {
				operands.add(o);
			});
		} else {
			operands.add(a);
		}
		if (b instanceof AND) {
			b.opnds.map(function (o) {
				operands.add(o);
			});
		} else {
			operands.add(b);
		}
		var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			// interested in the transition with the lowest precedence
			var reduced = null;
			precedencePredicates.map(function (p) {
				if (reduced === null || p.precedence < reduced.precedence) {
					reduced = p;
				}
			});
			operands.add(reduced);
		}
		this.opnds = operands.values();
		return this;
	}

	AND.prototype = Object.create(SemanticContext.prototype);
	AND.prototype.constructor = AND;

	AND.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof AND)) {
			return false;
		} else {
			return this.opnds === other.opnds;
		}
	};

	AND.prototype.updateHashCode = function (hash) {
		hash.update(this.opnds, "AND");
	};
	//
	// {@inheritDoc}
	//
	// <p>
	// The evaluation of predicates by this context is short-circuiting, but
	// unordered.</p>
	//
	AND.prototype.evaluate = function (parser, outerContext) {
		for (var i = 0; i < this.opnds.length; i++) {
			if (!this.opnds[i].evaluate(parser, outerContext)) {
				return false;
			}
		}
		return true;
	};

	AND.prototype.evalPrecedence = function (parser, outerContext) {
		var differs = false;
		var operands = [];
		for (var i = 0; i < this.opnds.length; i++) {
			var context = this.opnds[i];
			var evaluated = context.evalPrecedence(parser, outerContext);
			differs |= evaluated !== context;
			if (evaluated === null) {
				// The AND context is false if any element is false
				return null;
			} else if (evaluated !== SemanticContext.NONE) {
				// Reduce the result by skipping true elements
				operands.push(evaluated);
			}
		}
		if (!differs) {
			return this;
		}
		if (operands.length === 0) {
			// all elements were true, so the AND context is true
			return SemanticContext.NONE;
		}
		var result = null;
		operands.map(function (o) {
			result = result === null ? o : SemanticContext.andContext(result, o);
		});
		return result;
	};

	AND.prototype.toString = function () {
		var s = "";
		this.opnds.map(function (o) {
			s += "&& " + o.toString();
		});
		return s.length > 3 ? s.slice(3) : s;
	};

	//
	// A semantic context which is true whenever at least one of the contained
	// contexts is true.
	//
	function OR(a, b) {
		SemanticContext.call(this);
		var operands = new Set();
		if (a instanceof OR) {
			a.opnds.map(function (o) {
				operands.add(o);
			});
		} else {
			operands.add(a);
		}
		if (b instanceof OR) {
			b.opnds.map(function (o) {
				operands.add(o);
			});
		} else {
			operands.add(b);
		}

		var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			// interested in the transition with the highest precedence
			var s = precedencePredicates.sort(function (a, b) {
				return a.compareTo(b);
			});
			var reduced = s[s.length - 1];
			operands.add(reduced);
		}
		this.opnds = operands.values();
		return this;
	}

	OR.prototype = Object.create(SemanticContext.prototype);
	OR.prototype.constructor = OR;

	OR.prototype.constructor = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof OR)) {
			return false;
		} else {
			return this.opnds === other.opnds;
		}
	};

	OR.prototype.updateHashCode = function (hash) {
		hash.update(this.opnds, "OR");
	};

	// <p>
	// The evaluation of predicates by this context is short-circuiting, but
	// unordered.</p>
	//
	OR.prototype.evaluate = function (parser, outerContext) {
		for (var i = 0; i < this.opnds.length; i++) {
			if (this.opnds[i].evaluate(parser, outerContext)) {
				return true;
			}
		}
		return false;
	};

	OR.prototype.evalPrecedence = function (parser, outerContext) {
		var differs = false;
		var operands = [];
		for (var i = 0; i < this.opnds.length; i++) {
			var context = this.opnds[i];
			var evaluated = context.evalPrecedence(parser, outerContext);
			differs |= evaluated !== context;
			if (evaluated === SemanticContext.NONE) {
				// The OR context is true if any element is true
				return SemanticContext.NONE;
			} else if (evaluated !== null) {
				// Reduce the result by skipping false elements
				operands.push(evaluated);
			}
		}
		if (!differs) {
			return this;
		}
		if (operands.length === 0) {
			// all elements were false, so the OR context is false
			return null;
		}
		var result = null;
		operands.map(function (o) {
			return result === null ? o : SemanticContext.orContext(result, o);
		});
		return result;
	};

	OR.prototype.toString = function () {
		var s = "";
		this.opnds.map(function (o) {
			s += "|| " + o.toString();
		});
		return s.length > 3 ? s.slice(3) : s;
	};

	exports.SemanticContext = SemanticContext;
	exports.PrecedencePredicate = PrecedencePredicate;
	exports.Predicate = Predicate;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	/*jslint smarttabs:true */

	var Token = __webpack_require__(6).Token;

	/* stop is not included! */
	function Interval(start, stop) {
		this.start = start;
		this.stop = stop;
		return this;
	}

	Interval.prototype.contains = function (item) {
		return item >= this.start && item < this.stop;
	};

	Interval.prototype.toString = function () {
		if (this.start === this.stop - 1) {
			return this.start.toString();
		} else {
			return this.start.toString() + ".." + (this.stop - 1).toString();
		}
	};

	Object.defineProperty(Interval.prototype, "length", {
		get: function get() {
			return this.stop - this.start;
		}
	});

	function IntervalSet() {
		this.intervals = null;
		this.readOnly = false;
	}

	IntervalSet.prototype.first = function (v) {
		if (this.intervals === null || this.intervals.length === 0) {
			return Token.INVALID_TYPE;
		} else {
			return this.intervals[0].start;
		}
	};

	IntervalSet.prototype.addOne = function (v) {
		this.addInterval(new Interval(v, v + 1));
	};

	IntervalSet.prototype.addRange = function (l, h) {
		this.addInterval(new Interval(l, h + 1));
	};

	IntervalSet.prototype.addInterval = function (v) {
		if (this.intervals === null) {
			this.intervals = [];
			this.intervals.push(v);
		} else {
			// find insert pos
			for (var k = 0; k < this.intervals.length; k++) {
				var i = this.intervals[k];
				// distinct range -> insert
				if (v.stop < i.start) {
					this.intervals.splice(k, 0, v);
					return;
				}
				// contiguous range -> adjust
				else if (v.stop === i.start) {
						this.intervals[k].start = v.start;
						return;
					}
					// overlapping range -> adjust and reduce
					else if (v.start <= i.stop) {
							this.intervals[k] = new Interval(Math.min(i.start, v.start), Math.max(i.stop, v.stop));
							this.reduce(k);
							return;
						}
			}
			// greater than any existing
			this.intervals.push(v);
		}
	};

	IntervalSet.prototype.addSet = function (other) {
		if (other.intervals !== null) {
			for (var k = 0; k < other.intervals.length; k++) {
				var i = other.intervals[k];
				this.addInterval(new Interval(i.start, i.stop));
			}
		}
		return this;
	};

	IntervalSet.prototype.reduce = function (k) {
		// only need to reduce if k is not the last
		if (k < this.intervalslength - 1) {
			var l = this.intervals[k];
			var r = this.intervals[k + 1];
			// if r contained in l
			if (l.stop >= r.stop) {
				this.intervals.pop(k + 1);
				this.reduce(k);
			} else if (l.stop >= r.start) {
				this.intervals[k] = new Interval(l.start, r.stop);
				this.intervals.pop(k + 1);
			}
		}
	};

	IntervalSet.prototype.complement = function (start, stop) {
		var result = new IntervalSet();
		result.addInterval(new Interval(start, stop + 1));
		for (var i = 0; i < this.intervals.length; i++) {
			result.removeRange(this.intervals[i]);
		}
		return result;
	};

	IntervalSet.prototype.contains = function (item) {
		if (this.intervals === null) {
			return false;
		} else {
			for (var k = 0; k < this.intervals.length; k++) {
				if (this.intervals[k].contains(item)) {
					return true;
				}
			}
			return false;
		}
	};

	Object.defineProperty(IntervalSet.prototype, "length", {
		get: function get() {
			var len = 0;
			this.intervals.map(function (i) {
				len += i.length;
			});
			return len;
		}
	});

	IntervalSet.prototype.removeRange = function (v) {
		if (v.start === v.stop - 1) {
			this.removeOne(v.start);
		} else if (this.intervals !== null) {
			var k = 0;
			for (var n = 0; n < this.intervals.length; n++) {
				var i = this.intervals[k];
				// intervals are ordered
				if (v.stop <= i.start) {
					return;
				}
				// check for including range, split it
				else if (v.start > i.start && v.stop < i.stop) {
						this.intervals[k] = new Interval(i.start, v.start);
						var x = new Interval(v.stop, i.stop);
						this.intervals.splice(k, 0, x);
						return;
					}
					// check for included range, remove it
					else if (v.start <= i.start && v.stop >= i.stop) {
							this.intervals.splice(k, 1);
							k = k - 1; // need another pass
						}
						// check for lower boundary
						else if (v.start < i.stop) {
								this.intervals[k] = new Interval(i.start, v.start);
							}
							// check for upper boundary
							else if (v.stop < i.stop) {
									this.intervals[k] = new Interval(v.stop, i.stop);
								}
				k += 1;
			}
		}
	};

	IntervalSet.prototype.removeOne = function (v) {
		if (this.intervals !== null) {
			for (var k = 0; k < this.intervals.length; k++) {
				var i = this.intervals[k];
				// intervals is ordered
				if (v < i.start) {
					return;
				}
				// check for single value range
				else if (v === i.start && v === i.stop - 1) {
						this.intervals.splice(k, 1);
						return;
					}
					// check for lower boundary
					else if (v === i.start) {
							this.intervals[k] = new Interval(i.start + 1, i.stop);
							return;
						}
						// check for upper boundary
						else if (v === i.stop - 1) {
								this.intervals[k] = new Interval(i.start, i.stop - 1);
								return;
							}
							// split existing range
							else if (v < i.stop - 1) {
									var x = new Interval(i.start, v);
									i.start = v + 1;
									this.intervals.splice(k, 0, x);
									return;
								}
			}
		}
	};

	IntervalSet.prototype.toString = function (literalNames, symbolicNames, elemsAreChar) {
		literalNames = literalNames || null;
		symbolicNames = symbolicNames || null;
		elemsAreChar = elemsAreChar || false;
		if (this.intervals === null) {
			return "{}";
		} else if (literalNames !== null || symbolicNames !== null) {
			return this.toTokenString(literalNames, symbolicNames);
		} else if (elemsAreChar) {
			return this.toCharString();
		} else {
			return this.toIndexString();
		}
	};

	IntervalSet.prototype.toCharString = function () {
		var names = [];
		for (var i = 0; i < this.intervals.length; i++) {
			var v = this.intervals[i];
			if (v.stop === v.start + 1) {
				if (v.start === Token.EOF) {
					names.push("<EOF>");
				} else {
					names.push("'" + String.fromCharCode(v.start) + "'");
				}
			} else {
				names.push("'" + String.fromCharCode(v.start) + "'..'" + String.fromCharCode(v.stop - 1) + "'");
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	};

	IntervalSet.prototype.toIndexString = function () {
		var names = [];
		for (var i = 0; i < this.intervals.length; i++) {
			var v = this.intervals[i];
			if (v.stop === v.start + 1) {
				if (v.start === Token.EOF) {
					names.push("<EOF>");
				} else {
					names.push(v.start.toString());
				}
			} else {
				names.push(v.start.toString() + ".." + (v.stop - 1).toString());
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	};

	IntervalSet.prototype.toTokenString = function (literalNames, symbolicNames) {
		var names = [];
		for (var i = 0; i < this.intervals.length; i++) {
			var v = this.intervals[i];
			for (var j = v.start; j < v.stop; j++) {
				names.push(this.elementName(literalNames, symbolicNames, j));
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	};

	IntervalSet.prototype.elementName = function (literalNames, symbolicNames, a) {
		if (a === Token.EOF) {
			return "<EOF>";
		} else if (a === Token.EPSILON) {
			return "<EPSILON>";
		} else {
			return literalNames[a] || symbolicNames[a];
		}
	};

	exports.Interval = Interval;
	exports.IntervalSet = IntervalSet;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	//  An ATN transition between any two ATN states.  Subclasses define
	//  atom, set, epsilon, action, predicate, rule transitions.
	//
	//  <p>This is a one way link.  It emanates from a state (usually via a list of
	//  transitions) and has a target state.</p>
	//
	//  <p>Since we never have to change the ATN transitions once we construct it,
	//  we can fix these transitions as specific classes. The DFA transitions
	//  on the other hand need to update the labels as it adds transitions to
	//  the states. We'll use the term Edge for the DFA to distinguish them from
	//  ATN transitions.</p>

	var Token = __webpack_require__(6).Token;
	var Interval = __webpack_require__(10).Interval;
	var IntervalSet = __webpack_require__(10).IntervalSet;
	var Predicate = __webpack_require__(9).Predicate;
	var PrecedencePredicate = __webpack_require__(9).PrecedencePredicate;

	function Transition(target) {
	  // The target of this transition.
	  if (target === undefined || target === null) {
	    throw "target cannot be null.";
	  }
	  this.target = target;
	  // Are we epsilon, action, sempred?
	  this.isEpsilon = false;
	  this.label = null;
	  return this;
	}
	// constants for serialization
	Transition.EPSILON = 1;
	Transition.RANGE = 2;
	Transition.RULE = 3;
	Transition.PREDICATE = 4; // e.g., {isType(input.LT(1))}?
	Transition.ATOM = 5;
	Transition.ACTION = 6;
	Transition.SET = 7; // ~(A|B) or ~atom, wildcard, which convert to next 2
	Transition.NOT_SET = 8;
	Transition.WILDCARD = 9;
	Transition.PRECEDENCE = 10;

	Transition.serializationNames = ["INVALID", "EPSILON", "RANGE", "RULE", "PREDICATE", "ATOM", "ACTION", "SET", "NOT_SET", "WILDCARD", "PRECEDENCE"];

	Transition.serializationTypes = {
	  EpsilonTransition: Transition.EPSILON,
	  RangeTransition: Transition.RANGE,
	  RuleTransition: Transition.RULE,
	  PredicateTransition: Transition.PREDICATE,
	  AtomTransition: Transition.ATOM,
	  ActionTransition: Transition.ACTION,
	  SetTransition: Transition.SET,
	  NotSetTransition: Transition.NOT_SET,
	  WildcardTransition: Transition.WILDCARD,
	  PrecedencePredicateTransition: Transition.PRECEDENCE
	};

	// TODO: make all transitions sets? no, should remove set edges
	function AtomTransition(target, label) {
	  Transition.call(this, target);
	  this.label_ = label; // The token type or character value; or, signifies special label.
	  this.label = this.makeLabel();
	  this.serializationType = Transition.ATOM;
	  return this;
	}

	AtomTransition.prototype = Object.create(Transition.prototype);
	AtomTransition.prototype.constructor = AtomTransition;

	AtomTransition.prototype.makeLabel = function () {
	  var s = new IntervalSet();
	  s.addOne(this.label_);
	  return s;
	};

	AtomTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return this.label_ === symbol;
	};

	AtomTransition.prototype.toString = function () {
	  return this.label_;
	};

	function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
	  Transition.call(this, ruleStart);
	  this.ruleIndex = ruleIndex; // ptr to the rule definition object for this rule ref
	  this.precedence = precedence;
	  this.followState = followState; // what node to begin computations following ref to rule
	  this.serializationType = Transition.RULE;
	  this.isEpsilon = true;
	  return this;
	}

	RuleTransition.prototype = Object.create(Transition.prototype);
	RuleTransition.prototype.constructor = RuleTransition;

	RuleTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return false;
	};

	function EpsilonTransition(target, outermostPrecedenceReturn) {
	  Transition.call(this, target);
	  this.serializationType = Transition.EPSILON;
	  this.isEpsilon = true;
	  this.outermostPrecedenceReturn = outermostPrecedenceReturn;
	  return this;
	}

	EpsilonTransition.prototype = Object.create(Transition.prototype);
	EpsilonTransition.prototype.constructor = EpsilonTransition;

	EpsilonTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return false;
	};

	EpsilonTransition.prototype.toString = function () {
	  return "epsilon";
	};

	function RangeTransition(target, start, stop) {
	  Transition.call(this, target);
	  this.serializationType = Transition.RANGE;
	  this.start = start;
	  this.stop = stop;
	  this.label = this.makeLabel();
	  return this;
	}

	RangeTransition.prototype = Object.create(Transition.prototype);
	RangeTransition.prototype.constructor = RangeTransition;

	RangeTransition.prototype.makeLabel = function () {
	  var s = new IntervalSet();
	  s.addRange(this.start, this.stop);
	  return s;
	};

	RangeTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return symbol >= this.start && symbol <= this.stop;
	};

	RangeTransition.prototype.toString = function () {
	  return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
	};

	function AbstractPredicateTransition(target) {
	  Transition.call(this, target);
	  return this;
	}

	AbstractPredicateTransition.prototype = Object.create(Transition.prototype);
	AbstractPredicateTransition.prototype.constructor = AbstractPredicateTransition;

	function PredicateTransition(target, ruleIndex, predIndex, isCtxDependent) {
	  AbstractPredicateTransition.call(this, target);
	  this.serializationType = Transition.PREDICATE;
	  this.ruleIndex = ruleIndex;
	  this.predIndex = predIndex;
	  this.isCtxDependent = isCtxDependent; // e.g., $i ref in pred
	  this.isEpsilon = true;
	  return this;
	}

	PredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
	PredicateTransition.prototype.constructor = PredicateTransition;

	PredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return false;
	};

	PredicateTransition.prototype.getPredicate = function () {
	  return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
	};

	PredicateTransition.prototype.toString = function () {
	  return "pred_" + this.ruleIndex + ":" + this.predIndex;
	};

	function ActionTransition(target, ruleIndex, actionIndex, isCtxDependent) {
	  Transition.call(this, target);
	  this.serializationType = Transition.ACTION;
	  this.ruleIndex = ruleIndex;
	  this.actionIndex = actionIndex === undefined ? -1 : actionIndex;
	  this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred
	  this.isEpsilon = true;
	  return this;
	}

	ActionTransition.prototype = Object.create(Transition.prototype);
	ActionTransition.prototype.constructor = ActionTransition;

	ActionTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return false;
	};

	ActionTransition.prototype.toString = function () {
	  return "action_" + this.ruleIndex + ":" + this.actionIndex;
	};

	// A transition containing a set of values.
	function SetTransition(target, set) {
	  Transition.call(this, target);
	  this.serializationType = Transition.SET;
	  if (set !== undefined && set !== null) {
	    this.label = set;
	  } else {
	    this.label = new IntervalSet();
	    this.label.addOne(Token.INVALID_TYPE);
	  }
	  return this;
	}

	SetTransition.prototype = Object.create(Transition.prototype);
	SetTransition.prototype.constructor = SetTransition;

	SetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return this.label.contains(symbol);
	};

	SetTransition.prototype.toString = function () {
	  return this.label.toString();
	};

	function NotSetTransition(target, set) {
	  SetTransition.call(this, target, set);
	  this.serializationType = Transition.NOT_SET;
	  return this;
	}

	NotSetTransition.prototype = Object.create(SetTransition.prototype);
	NotSetTransition.prototype.constructor = NotSetTransition;

	NotSetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !SetTransition.prototype.matches.call(this, symbol, minVocabSymbol, maxVocabSymbol);
	};

	NotSetTransition.prototype.toString = function () {
	  return '~' + SetTransition.prototype.toString.call(this);
	};

	function WildcardTransition(target) {
	  Transition.call(this, target);
	  this.serializationType = Transition.WILDCARD;
	  return this;
	}

	WildcardTransition.prototype = Object.create(Transition.prototype);
	WildcardTransition.prototype.constructor = WildcardTransition;

	WildcardTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
	};

	WildcardTransition.prototype.toString = function () {
	  return ".";
	};

	function PrecedencePredicateTransition(target, precedence) {
	  AbstractPredicateTransition.call(this, target);
	  this.serializationType = Transition.PRECEDENCE;
	  this.precedence = precedence;
	  this.isEpsilon = true;
	  return this;
	}

	PrecedencePredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
	PrecedencePredicateTransition.prototype.constructor = PrecedencePredicateTransition;

	PrecedencePredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
	  return false;
	};

	PrecedencePredicateTransition.prototype.getPredicate = function () {
	  return new PrecedencePredicate(this.precedence);
	};

	PrecedencePredicateTransition.prototype.toString = function () {
	  return this.precedence + " >= _p";
	};

	exports.Transition = Transition;
	exports.AtomTransition = AtomTransition;
	exports.SetTransition = SetTransition;
	exports.NotSetTransition = NotSetTransition;
	exports.RuleTransition = RuleTransition;
	exports.ActionTransition = ActionTransition;
	exports.EpsilonTransition = EpsilonTransition;
	exports.RangeTransition = RangeTransition;
	exports.WildcardTransition = WildcardTransition;
	exports.PredicateTransition = PredicateTransition;
	exports.PrecedencePredicateTransition = PrecedencePredicateTransition;
	exports.AbstractPredicateTransition = AbstractPredicateTransition;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	var RuleContext = __webpack_require__(13).RuleContext;
	var Hash = __webpack_require__(5).Hash;

	function PredictionContext(cachedHashCode) {
		this.cachedHashCode = cachedHashCode;
	}

	// Represents {@code $} in local context prediction, which means wildcard.
	// {@code//+x =//}.
	// /
	PredictionContext.EMPTY = null;

	// Represents {@code $} in an array in full context mode, when {@code $}
	// doesn't mean wildcard: {@code $ + x = [$,x]}. Here,
	// {@code $} = {@link //EMPTY_RETURN_STATE}.
	// /
	PredictionContext.EMPTY_RETURN_STATE = 0x7FFFFFFF;

	PredictionContext.globalNodeCount = 1;
	PredictionContext.id = PredictionContext.globalNodeCount;

	// Stores the computed hash code of this {@link PredictionContext}. The hash
	// code is computed in parts to match the following reference algorithm.
	//
	// <pre>
	// private int referenceHashCode() {
	// int hash = {@link MurmurHash//initialize MurmurHash.initialize}({@link
	// //INITIAL_HASH});
	//
	// for (int i = 0; i &lt; {@link //size()}; i++) {
	// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link //getParent
	// getParent}(i));
	// }
	//
	// for (int i = 0; i &lt; {@link //size()}; i++) {
	// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link
	// //getReturnState getReturnState}(i));
	// }
	//
	// hash = {@link MurmurHash//finish MurmurHash.finish}(hash, 2// {@link
	// //size()});
	// return hash;
	// }
	// </pre>
	// /

	// This means only the {@link //EMPTY} context is in set.
	PredictionContext.prototype.isEmpty = function () {
		return this === PredictionContext.EMPTY;
	};

	PredictionContext.prototype.hasEmptyPath = function () {
		return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
	};

	PredictionContext.prototype.hashCode = function () {
		return this.cachedHashCode;
	};

	PredictionContext.prototype.updateHashCode = function (hash) {
		hash.update(this.cachedHashCode);
	};
	/*
	function calculateHashString(parent, returnState) {
		return "" + parent + returnState;
	}
	*/

	// Used to cache {@link PredictionContext} objects. Its used for the shared
	// context cash associated with contexts in DFA states. This cache
	// can be used for both lexers and parsers.

	function PredictionContextCache() {
		this.cache = {};
		return this;
	}

	// Add a context to the cache and return it. If the context already exists,
	// return that one instead and do not add a new context to the cache.
	// Protect shared cache from unsafe thread access.
	//
	PredictionContextCache.prototype.add = function (ctx) {
		if (ctx === PredictionContext.EMPTY) {
			return PredictionContext.EMPTY;
		}
		var existing = this.cache[ctx] || null;
		if (existing !== null) {
			return existing;
		}
		this.cache[ctx] = ctx;
		return ctx;
	};

	PredictionContextCache.prototype.get = function (ctx) {
		return this.cache[ctx] || null;
	};

	Object.defineProperty(PredictionContextCache.prototype, "length", {
		get: function get() {
			return this.cache.length;
		}
	});

	function SingletonPredictionContext(parent, returnState) {
		var hashCode = 0;
		if (parent !== null) {
			var hash = new Hash();
			hash.update(parent, returnState);
			hashCode = hash.finish();
		}
		PredictionContext.call(this, hashCode);
		this.parentCtx = parent;
		this.returnState = returnState;
	}

	SingletonPredictionContext.prototype = Object.create(PredictionContext.prototype);
	SingletonPredictionContext.prototype.contructor = SingletonPredictionContext;

	SingletonPredictionContext.create = function (parent, returnState) {
		if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
			// someone can pass in the bits of an array ctx that mean $
			return PredictionContext.EMPTY;
		} else {
			return new SingletonPredictionContext(parent, returnState);
		}
	};

	Object.defineProperty(SingletonPredictionContext.prototype, "length", {
		get: function get() {
			return 1;
		}
	});

	SingletonPredictionContext.prototype.getParent = function (index) {
		return this.parentCtx;
	};

	SingletonPredictionContext.prototype.getReturnState = function (index) {
		return this.returnState;
	};

	SingletonPredictionContext.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof SingletonPredictionContext)) {
			return false;
		} else if (this.hashCode() !== other.hashCode()) {
			return false; // can't be same if hash is different
		} else {
			if (this.returnState !== other.returnState) return false;else if (this.parentCtx == null) return other.parentCtx == null;else return this.parentCtx.equals(other.parentCtx);
		}
	};

	SingletonPredictionContext.prototype.toString = function () {
		var up = this.parentCtx === null ? "" : this.parentCtx.toString();
		if (up.length === 0) {
			if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
				return "$";
			} else {
				return "" + this.returnState;
			}
		} else {
			return "" + this.returnState + " " + up;
		}
	};

	function EmptyPredictionContext() {
		SingletonPredictionContext.call(this, null, PredictionContext.EMPTY_RETURN_STATE);
		return this;
	}

	EmptyPredictionContext.prototype = Object.create(SingletonPredictionContext.prototype);
	EmptyPredictionContext.prototype.constructor = EmptyPredictionContext;

	EmptyPredictionContext.prototype.isEmpty = function () {
		return true;
	};

	EmptyPredictionContext.prototype.getParent = function (index) {
		return null;
	};

	EmptyPredictionContext.prototype.getReturnState = function (index) {
		return this.returnState;
	};

	EmptyPredictionContext.prototype.equals = function (other) {
		return this === other;
	};

	EmptyPredictionContext.prototype.toString = function () {
		return "$";
	};

	PredictionContext.EMPTY = new EmptyPredictionContext();

	function ArrayPredictionContext(parents, returnStates) {
		// Parent can be null only if full ctx mode and we make an array
		// from {@link //EMPTY} and non-empty. We merge {@link //EMPTY} by using
		// null parent and
		// returnState == {@link //EMPTY_RETURN_STATE}.
		var h = new Hash();
		h.update(parents, returnStates);
		var hashCode = h.finish();
		PredictionContext.call(this, hashCode);
		this.parents = parents;
		this.returnStates = returnStates;
		return this;
	}

	ArrayPredictionContext.prototype = Object.create(PredictionContext.prototype);
	ArrayPredictionContext.prototype.constructor = ArrayPredictionContext;

	ArrayPredictionContext.prototype.isEmpty = function () {
		// since EMPTY_RETURN_STATE can only appear in the last position, we
		// don't need to verify that size==1
		return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
	};

	Object.defineProperty(ArrayPredictionContext.prototype, "length", {
		get: function get() {
			return this.returnStates.length;
		}
	});

	ArrayPredictionContext.prototype.getParent = function (index) {
		return this.parents[index];
	};

	ArrayPredictionContext.prototype.getReturnState = function (index) {
		return this.returnStates[index];
	};

	ArrayPredictionContext.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof ArrayPredictionContext)) {
			return false;
		} else if (this.hashCode() !== other.hashCode()) {
			return false; // can't be same if hash is different
		} else {
			return this.returnStates === other.returnStates && this.parents === other.parents;
		}
	};

	ArrayPredictionContext.prototype.toString = function () {
		if (this.isEmpty()) {
			return "[]";
		} else {
			var s = "[";
			for (var i = 0; i < this.returnStates.length; i++) {
				if (i > 0) {
					s = s + ", ";
				}
				if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
					s = s + "$";
					continue;
				}
				s = s + this.returnStates[i];
				if (this.parents[i] !== null) {
					s = s + " " + this.parents[i];
				} else {
					s = s + "null";
				}
			}
			return s + "]";
		}
	};

	// Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
	// Return {@link //EMPTY} if {@code outerContext} is empty or null.
	// /
	function predictionContextFromRuleContext(atn, outerContext) {
		if (outerContext === undefined || outerContext === null) {
			outerContext = RuleContext.EMPTY;
		}
		// if we are in RuleContext of start rule, s, then PredictionContext
		// is EMPTY. Nobody called us. (if we are empty, return empty)
		if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
			return PredictionContext.EMPTY;
		}
		// If we have a parent, convert it to a PredictionContext graph
		var parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
		var state = atn.states[outerContext.invokingState];
		var transition = state.transitions[0];
		return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
	}
	/*
	function calculateListsHashString(parents, returnStates) {
		var s = "";
		parents.map(function(p) {
			s = s + p;
		});
		returnStates.map(function(r) {
			s = s + r;
		});
		return s;
	}
	*/
	function merge(a, b, rootIsWildcard, mergeCache) {
		// share same graph if both same
		if (a === b) {
			return a;
		}
		if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
			return mergeSingletons(a, b, rootIsWildcard, mergeCache);
		}
		// At least one of a or b is array
		// If one is $ and rootIsWildcard, return $ as// wildcard
		if (rootIsWildcard) {
			if (a instanceof EmptyPredictionContext) {
				return a;
			}
			if (b instanceof EmptyPredictionContext) {
				return b;
			}
		}
		// convert singleton so both are arrays to normalize
		if (a instanceof SingletonPredictionContext) {
			a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
		}
		if (b instanceof SingletonPredictionContext) {
			b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
		}
		return mergeArrays(a, b, rootIsWildcard, mergeCache);
	}

	//
	// Merge two {@link SingletonPredictionContext} instances.
	//
	// <p>Stack tops equal, parents merge is same; return left graph.<br>
	// <embed src="images/SingletonMerge_SameRootSamePar.svg"
	// type="image/svg+xml"/></p>
	//
	// <p>Same stack top, parents differ; merge parents giving array node, then
	// remainders of those graphs. A new root node is created to point to the
	// merged parents.<br>
	// <embed src="images/SingletonMerge_SameRootDiffPar.svg"
	// type="image/svg+xml"/></p>
	//
	// <p>Different stack tops pointing to same parent. Make array node for the
	// root where both element in the root point to the same (original)
	// parent.<br>
	// <embed src="images/SingletonMerge_DiffRootSamePar.svg"
	// type="image/svg+xml"/></p>
	//
	// <p>Different stack tops pointing to different parents. Make array node for
	// the root where each element points to the corresponding original
	// parent.<br>
	// <embed src="images/SingletonMerge_DiffRootDiffPar.svg"
	// type="image/svg+xml"/></p>
	//
	// @param a the first {@link SingletonPredictionContext}
	// @param b the second {@link SingletonPredictionContext}
	// @param rootIsWildcard {@code true} if this is a local-context merge,
	// otherwise false to indicate a full-context merge
	// @param mergeCache
	// /
	function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
		if (mergeCache !== null) {
			var previous = mergeCache.get(a, b);
			if (previous !== null) {
				return previous;
			}
			previous = mergeCache.get(b, a);
			if (previous !== null) {
				return previous;
			}
		}

		var rootMerge = mergeRoot(a, b, rootIsWildcard);
		if (rootMerge !== null) {
			if (mergeCache !== null) {
				mergeCache.set(a, b, rootMerge);
			}
			return rootMerge;
		}
		if (a.returnState === b.returnState) {
			var parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
			// if parent is same as existing a or b parent or reduced to a parent,
			// return it
			if (parent === a.parentCtx) {
				return a; // ax + bx = ax, if a=b
			}
			if (parent === b.parentCtx) {
				return b; // ax + bx = bx, if a=b
			}
			// else: ax + ay = a'[x,y]
			// merge parents x and y, giving array node with x,y then remainders
			// of those graphs. dup a, a' points at merged array
			// new joined parent so create new singleton pointing to it, a'
			var spc = SingletonPredictionContext.create(parent, a.returnState);
			if (mergeCache !== null) {
				mergeCache.set(a, b, spc);
			}
			return spc;
		} else {
			// a != b payloads differ
			// see if we can collapse parents due to $+x parents if local ctx
			var singleParent = null;
			if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
				// ax +
				// bx =
				// [a,b]x
				singleParent = a.parentCtx;
			}
			if (singleParent !== null) {
				// parents are same
				// sort payloads and use same parent
				var payloads = [a.returnState, b.returnState];
				if (a.returnState > b.returnState) {
					payloads[0] = b.returnState;
					payloads[1] = a.returnState;
				}
				var parents = [singleParent, singleParent];
				var apc = new ArrayPredictionContext(parents, payloads);
				if (mergeCache !== null) {
					mergeCache.set(a, b, apc);
				}
				return apc;
			}
			// parents differ and can't merge them. Just pack together
			// into array; can't merge.
			// ax + by = [ax,by]
			var payloads = [a.returnState, b.returnState];
			var parents = [a.parentCtx, b.parentCtx];
			if (a.returnState > b.returnState) {
				// sort by payload
				payloads[0] = b.returnState;
				payloads[1] = a.returnState;
				parents = [b.parentCtx, a.parentCtx];
			}
			var a_ = new ArrayPredictionContext(parents, payloads);
			if (mergeCache !== null) {
				mergeCache.set(a, b, a_);
			}
			return a_;
		}
	}

	//
	// Handle case where at least one of {@code a} or {@code b} is
	// {@link //EMPTY}. In the following diagrams, the symbol {@code $} is used
	// to represent {@link //EMPTY}.
	//
	// <h2>Local-Context Merges</h2>
	//
	// <p>These local-context merge operations are used when {@code rootIsWildcard}
	// is true.</p>
	//
	// <p>{@link //EMPTY} is superset of any graph; return {@link //EMPTY}.<br>
	// <embed src="images/LocalMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
	//
	// <p>{@link //EMPTY} and anything is {@code //EMPTY}, so merged parent is
	// {@code //EMPTY}; return left graph.<br>
	// <embed src="images/LocalMerge_EmptyParent.svg" type="image/svg+xml"/></p>
	//
	// <p>Special case of last merge if local context.<br>
	// <embed src="images/LocalMerge_DiffRoots.svg" type="image/svg+xml"/></p>
	//
	// <h2>Full-Context Merges</h2>
	//
	// <p>These full-context merge operations are used when {@code rootIsWildcard}
	// is false.</p>
	//
	// <p><embed src="images/FullMerge_EmptyRoots.svg" type="image/svg+xml"/></p>
	//
	// <p>Must keep all contexts; {@link //EMPTY} in array is a special value (and
	// null parent).<br>
	// <embed src="images/FullMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
	//
	// <p><embed src="images/FullMerge_SameRoot.svg" type="image/svg+xml"/></p>
	//
	// @param a the first {@link SingletonPredictionContext}
	// @param b the second {@link SingletonPredictionContext}
	// @param rootIsWildcard {@code true} if this is a local-context merge,
	// otherwise false to indicate a full-context merge
	// /
	function mergeRoot(a, b, rootIsWildcard) {
		if (rootIsWildcard) {
			if (a === PredictionContext.EMPTY) {
				return PredictionContext.EMPTY; // // + b =//
			}
			if (b === PredictionContext.EMPTY) {
				return PredictionContext.EMPTY; // a +// =//
			}
		} else {
			if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
				return PredictionContext.EMPTY; // $ + $ = $
			} else if (a === PredictionContext.EMPTY) {
				// $ + x = [$,x]
				var payloads = [b.returnState, PredictionContext.EMPTY_RETURN_STATE];
				var parents = [b.parentCtx, null];
				return new ArrayPredictionContext(parents, payloads);
			} else if (b === PredictionContext.EMPTY) {
				// x + $ = [$,x] ($ is always first if present)
				var payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
				var parents = [a.parentCtx, null];
				return new ArrayPredictionContext(parents, payloads);
			}
		}
		return null;
	}

	//
	// Merge two {@link ArrayPredictionContext} instances.
	//
	// <p>Different tops, different parents.<br>
	// <embed src="images/ArrayMerge_DiffTopDiffPar.svg" type="image/svg+xml"/></p>
	//
	// <p>Shared top, same parents.<br>
	// <embed src="images/ArrayMerge_ShareTopSamePar.svg" type="image/svg+xml"/></p>
	//
	// <p>Shared top, different parents.<br>
	// <embed src="images/ArrayMerge_ShareTopDiffPar.svg" type="image/svg+xml"/></p>
	//
	// <p>Shared top, all shared parents.<br>
	// <embed src="images/ArrayMerge_ShareTopSharePar.svg"
	// type="image/svg+xml"/></p>
	//
	// <p>Equal tops, merge parents and reduce top to
	// {@link SingletonPredictionContext}.<br>
	// <embed src="images/ArrayMerge_EqualTop.svg" type="image/svg+xml"/></p>
	// /
	function mergeArrays(a, b, rootIsWildcard, mergeCache) {
		if (mergeCache !== null) {
			var previous = mergeCache.get(a, b);
			if (previous !== null) {
				return previous;
			}
			previous = mergeCache.get(b, a);
			if (previous !== null) {
				return previous;
			}
		}
		// merge sorted payloads a + b => M
		var i = 0; // walks a
		var j = 0; // walks b
		var k = 0; // walks target M array

		var mergedReturnStates = [];
		var mergedParents = [];
		// walk and merge to yield mergedParents, mergedReturnStates
		while (i < a.returnStates.length && j < b.returnStates.length) {
			var a_parent = a.parents[i];
			var b_parent = b.parents[j];
			if (a.returnStates[i] === b.returnStates[j]) {
				// same payload (stack tops are equal), must yield merged singleton
				var payload = a.returnStates[i];
				// $+$ = $
				var bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
				var ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent; // ax+ax
				// ->
				// ax
				if (bothDollars || ax_ax) {
					mergedParents[k] = a_parent; // choose left
					mergedReturnStates[k] = payload;
				} else {
					// ax+ay -> a'[x,y]
					var mergedParent = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
					mergedParents[k] = mergedParent;
					mergedReturnStates[k] = payload;
				}
				i += 1; // hop over left one as usual
				j += 1; // but also skip one in right side since we merge
			} else if (a.returnStates[i] < b.returnStates[j]) {
				// copy a[i] to M
				mergedParents[k] = a_parent;
				mergedReturnStates[k] = a.returnStates[i];
				i += 1;
			} else {
				// b > a, copy b[j] to M
				mergedParents[k] = b_parent;
				mergedReturnStates[k] = b.returnStates[j];
				j += 1;
			}
			k += 1;
		}
		// copy over any payloads remaining in either array
		if (i < a.returnStates.length) {
			for (var p = i; p < a.returnStates.length; p++) {
				mergedParents[k] = a.parents[p];
				mergedReturnStates[k] = a.returnStates[p];
				k += 1;
			}
		} else {
			for (var p = j; p < b.returnStates.length; p++) {
				mergedParents[k] = b.parents[p];
				mergedReturnStates[k] = b.returnStates[p];
				k += 1;
			}
		}
		// trim merged if we combined a few that had same stack tops
		if (k < mergedParents.length) {
			// write index < last position; trim
			if (k === 1) {
				// for just one merged element, return singleton top
				var a_ = SingletonPredictionContext.create(mergedParents[0], mergedReturnStates[0]);
				if (mergeCache !== null) {
					mergeCache.set(a, b, a_);
				}
				return a_;
			}
			mergedParents = mergedParents.slice(0, k);
			mergedReturnStates = mergedReturnStates.slice(0, k);
		}

		var M = new ArrayPredictionContext(mergedParents, mergedReturnStates);

		// if we created same array as a or b, return that instead
		// TODO: track whether this is possible above during merge sort for speed
		if (M === a) {
			if (mergeCache !== null) {
				mergeCache.set(a, b, a);
			}
			return a;
		}
		if (M === b) {
			if (mergeCache !== null) {
				mergeCache.set(a, b, b);
			}
			return b;
		}
		combineCommonParents(mergedParents);

		if (mergeCache !== null) {
			mergeCache.set(a, b, M);
		}
		return M;
	}

	//
	// Make pass over all <em>M</em> {@code parents}; merge any {@code equals()}
	// ones.
	// /
	function combineCommonParents(parents) {
		var uniqueParents = {};

		for (var p = 0; p < parents.length; p++) {
			var parent = parents[p];
			if (!(parent in uniqueParents)) {
				uniqueParents[parent] = parent;
			}
		}
		for (var q = 0; q < parents.length; q++) {
			parents[q] = uniqueParents[parents[q]];
		}
	}

	function getCachedPredictionContext(context, contextCache, visited) {
		if (context.isEmpty()) {
			return context;
		}
		var existing = visited[context] || null;
		if (existing !== null) {
			return existing;
		}
		existing = contextCache.get(context);
		if (existing !== null) {
			visited[context] = existing;
			return existing;
		}
		var changed = false;
		var parents = [];
		for (var i = 0; i < parents.length; i++) {
			var parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
			if (changed || parent !== context.getParent(i)) {
				if (!changed) {
					parents = [];
					for (var j = 0; j < context.length; j++) {
						parents[j] = context.getParent(j);
					}
					changed = true;
				}
				parents[i] = parent;
			}
		}
		if (!changed) {
			contextCache.add(context);
			visited[context] = context;
			return context;
		}
		var updated = null;
		if (parents.length === 0) {
			updated = PredictionContext.EMPTY;
		} else if (parents.length === 1) {
			updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
		} else {
			updated = new ArrayPredictionContext(parents, context.returnStates);
		}
		contextCache.add(updated);
		visited[updated] = updated;
		visited[context] = updated;

		return updated;
	}

	// ter's recursive version of Sam's getAllNodes()
	function getAllContextNodes(context, nodes, visited) {
		if (nodes === null) {
			nodes = [];
			return getAllContextNodes(context, nodes, visited);
		} else if (visited === null) {
			visited = {};
			return getAllContextNodes(context, nodes, visited);
		} else {
			if (context === null || visited[context] !== null) {
				return nodes;
			}
			visited[context] = context;
			nodes.push(context);
			for (var i = 0; i < context.length; i++) {
				getAllContextNodes(context.getParent(i), nodes, visited);
			}
			return nodes;
		}
	}

	exports.merge = merge;
	exports.PredictionContext = PredictionContext;
	exports.PredictionContextCache = PredictionContextCache;
	exports.SingletonPredictionContext = SingletonPredictionContext;
	exports.predictionContextFromRuleContext = predictionContextFromRuleContext;
	exports.getCachedPredictionContext = getCachedPredictionContext;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	//  A rule context is a record of a single rule invocation. It knows
	//  which context invoked it, if any. If there is no parent context, then
	//  naturally the invoking state is not valid.  The parent link
	//  provides a chain upwards from the current rule invocation to the root
	//  of the invocation tree, forming a stack. We actually carry no
	//  information about the rule associated with this context (except
	//  when parsing). We keep only the state number of the invoking state from
	//  the ATN submachine that invoked this. Contrast this with the s
	//  pointer inside ParserRuleContext that tracks the current state
	//  being "executed" for the current rule.
	//
	//  The parent contexts are useful for computing lookahead sets and
	//  getting error information.
	//
	//  These objects are used during parsing and prediction.
	//  For the special case of parsers, we use the subclass
	//  ParserRuleContext.
	//
	//  @see ParserRuleContext
	///

	var RuleNode = __webpack_require__(14).RuleNode;
	var INVALID_INTERVAL = __webpack_require__(14).INVALID_INTERVAL;
	var INVALID_ALT_NUMBER = __webpack_require__(3).INVALID_ALT_NUMBER;

	function RuleContext(parent, invokingState) {
		RuleNode.call(this);
		// What context invoked this rule?
		this.parentCtx = parent || null;
		// What state invoked the rule associated with this context?
		// The "return address" is the followState of invokingState
		// If parent is null, this should be -1.
		this.invokingState = invokingState || -1;
		return this;
	}

	RuleContext.prototype = Object.create(RuleNode.prototype);
	RuleContext.prototype.constructor = RuleContext;

	RuleContext.prototype.depth = function () {
		var n = 0;
		var p = this;
		while (p !== null) {
			p = p.parentCtx;
			n += 1;
		}
		return n;
	};

	// A context is empty if there is no invoking state; meaning nobody call
	// current context.
	RuleContext.prototype.isEmpty = function () {
		return this.invokingState === -1;
	};

	// satisfy the ParseTree / SyntaxTree interface

	RuleContext.prototype.getSourceInterval = function () {
		return INVALID_INTERVAL;
	};

	RuleContext.prototype.getRuleContext = function () {
		return this;
	};

	RuleContext.prototype.getPayload = function () {
		return this;
	};

	// Return the combined text of all child nodes. This method only considers
	// tokens which have been added to the parse tree.
	// <p>
	// Since tokens on hidden channels (e.g. whitespace or comments) are not
	// added to the parse trees, they will not appear in the output of this
	// method.
	// /
	RuleContext.prototype.getText = function () {
		if (this.getChildCount() === 0) {
			return "";
		} else {
			return this.children.map(function (child) {
				return child.getText();
			}).join("");
		}
	};

	// For rule associated with this parse tree internal node, return
	// the outer alternative number used to match the input. Default
	// implementation does not compute nor store this alt num. Create
	// a subclass of ParserRuleContext with backing field and set
	// option contextSuperClass.
	// to set it.
	RuleContext.prototype.getAltNumber = function () {
		return INVALID_ALT_NUMBER;
	};

	// Set the outer alternative number for this context node. Default
	// implementation does nothing to avoid backing field overhead for
	// trees that don't need it.  Create
	// a subclass of ParserRuleContext with backing field and set
	// option contextSuperClass.
	RuleContext.prototype.setAltNumber = function (altNumber) {};

	RuleContext.prototype.getChild = function (i) {
		return null;
	};

	RuleContext.prototype.getChildCount = function () {
		return 0;
	};

	RuleContext.prototype.accept = function (visitor) {
		return visitor.visitChildren(this);
	};

	//need to manage circular dependencies, so export now
	exports.RuleContext = RuleContext;
	var Trees = __webpack_require__(15).Trees;

	// Print out a whole tree, not just a node, in LISP format
	// (root child1 .. childN). Print just a node if this is a leaf.
	//

	RuleContext.prototype.toStringTree = function (ruleNames, recog) {
		return Trees.toStringTree(this, ruleNames, recog);
	};

	RuleContext.prototype.toString = function (ruleNames, stop) {
		ruleNames = ruleNames || null;
		stop = stop || null;
		var p = this;
		var s = "[";
		while (p !== null && p !== stop) {
			if (ruleNames === null) {
				if (!p.isEmpty()) {
					s += p.invokingState;
				}
			} else {
				var ri = p.ruleIndex;
				var ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
				s += ruleName;
			}
			if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
				s += " ";
			}
			p = p.parentCtx;
		}
		s += "]";
		return s;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// The basic notion of a tree has a parent, a payload, and a list of children.
	//  It is the most abstract interface for all the trees used by ANTLR.
	///

	var Token = __webpack_require__(6).Token;
	var Interval = __webpack_require__(10).Interval;
	var INVALID_INTERVAL = new Interval(-1, -2);
	var Utils = __webpack_require__(5);

	function Tree() {
		return this;
	}

	function SyntaxTree() {
		Tree.call(this);
		return this;
	}

	SyntaxTree.prototype = Object.create(Tree.prototype);
	SyntaxTree.prototype.constructor = SyntaxTree;

	function ParseTree() {
		SyntaxTree.call(this);
		return this;
	}

	ParseTree.prototype = Object.create(SyntaxTree.prototype);
	ParseTree.prototype.constructor = ParseTree;

	function RuleNode() {
		ParseTree.call(this);
		return this;
	}

	RuleNode.prototype = Object.create(ParseTree.prototype);
	RuleNode.prototype.constructor = RuleNode;

	function TerminalNode() {
		ParseTree.call(this);
		return this;
	}

	TerminalNode.prototype = Object.create(ParseTree.prototype);
	TerminalNode.prototype.constructor = TerminalNode;

	function ErrorNode() {
		TerminalNode.call(this);
		return this;
	}

	ErrorNode.prototype = Object.create(TerminalNode.prototype);
	ErrorNode.prototype.constructor = ErrorNode;

	function ParseTreeVisitor() {
		return this;
	}

	ParseTreeVisitor.prototype.visit = function (ctx) {
		if (Array.isArray(ctx)) {
			return ctx.map(function (child) {
				return ctx.accept(this);
			}, this);
		} else {
			return ctx.accept(this);
		}
	};

	ParseTreeVisitor.prototype.visitChildren = function (ctx) {
		return this.visit(ctx.children);
	};

	ParseTreeVisitor.prototype.visitTerminal = function (node) {};

	ParseTreeVisitor.prototype.visitErrorNode = function (node) {};

	function ParseTreeListener() {
		return this;
	}

	ParseTreeListener.prototype.visitTerminal = function (node) {};

	ParseTreeListener.prototype.visitErrorNode = function (node) {};

	ParseTreeListener.prototype.enterEveryRule = function (node) {};

	ParseTreeListener.prototype.exitEveryRule = function (node) {};

	function TerminalNodeImpl(symbol) {
		TerminalNode.call(this);
		this.parentCtx = null;
		this.symbol = symbol;
		return this;
	}

	TerminalNodeImpl.prototype = Object.create(TerminalNode.prototype);
	TerminalNodeImpl.prototype.constructor = TerminalNodeImpl;

	TerminalNodeImpl.prototype.getChild = function (i) {
		return null;
	};

	TerminalNodeImpl.prototype.getSymbol = function () {
		return this.symbol;
	};

	TerminalNodeImpl.prototype.getParent = function () {
		return this.parentCtx;
	};

	TerminalNodeImpl.prototype.getPayload = function () {
		return this.symbol;
	};

	TerminalNodeImpl.prototype.getSourceInterval = function () {
		if (this.symbol === null) {
			return INVALID_INTERVAL;
		}
		var tokenIndex = this.symbol.tokenIndex;
		return new Interval(tokenIndex, tokenIndex);
	};

	TerminalNodeImpl.prototype.getChildCount = function () {
		return 0;
	};

	TerminalNodeImpl.prototype.accept = function (visitor) {
		return visitor.visitTerminal(this);
	};

	TerminalNodeImpl.prototype.getText = function () {
		return this.symbol.text;
	};

	TerminalNodeImpl.prototype.toString = function () {
		if (this.symbol.type === Token.EOF) {
			return "<EOF>";
		} else {
			return this.symbol.text;
		}
	};

	// Represents a token that was consumed during resynchronization
	// rather than during a valid match operation. For example,
	// we will create this kind of a node during single token insertion
	// and deletion as well as during "consume until error recovery set"
	// upon no viable alternative exceptions.

	function ErrorNodeImpl(token) {
		TerminalNodeImpl.call(this, token);
		return this;
	}

	ErrorNodeImpl.prototype = Object.create(TerminalNodeImpl.prototype);
	ErrorNodeImpl.prototype.constructor = ErrorNodeImpl;

	ErrorNodeImpl.prototype.isErrorNode = function () {
		return true;
	};

	ErrorNodeImpl.prototype.accept = function (visitor) {
		return visitor.visitErrorNode(this);
	};

	function ParseTreeWalker() {
		return this;
	}

	ParseTreeWalker.prototype.walk = function (listener, t) {
		var errorNode = t instanceof ErrorNode || t.isErrorNode !== undefined && t.isErrorNode();
		if (errorNode) {
			listener.visitErrorNode(t);
		} else if (t instanceof TerminalNode) {
			listener.visitTerminal(t);
		} else {
			this.enterRule(listener, t);
			for (var i = 0; i < t.getChildCount(); i++) {
				var child = t.getChild(i);
				this.walk(listener, child);
			}
			this.exitRule(listener, t);
		}
	};
	//
	// The discovery of a rule node, involves sending two events: the generic
	// {@link ParseTreeListener//enterEveryRule} and a
	// {@link RuleContext}-specific event. First we trigger the generic and then
	// the rule specific. We to them in reverse order upon finishing the node.
	//
	ParseTreeWalker.prototype.enterRule = function (listener, r) {
		var ctx = r.getRuleContext();
		listener.enterEveryRule(ctx);
		ctx.enterRule(listener);
	};

	ParseTreeWalker.prototype.exitRule = function (listener, r) {
		var ctx = r.getRuleContext();
		ctx.exitRule(listener);
		listener.exitEveryRule(ctx);
	};

	ParseTreeWalker.DEFAULT = new ParseTreeWalker();

	exports.RuleNode = RuleNode;
	exports.ErrorNode = ErrorNode;
	exports.TerminalNode = TerminalNode;
	exports.ErrorNodeImpl = ErrorNodeImpl;
	exports.TerminalNodeImpl = TerminalNodeImpl;
	exports.ParseTreeListener = ParseTreeListener;
	exports.ParseTreeVisitor = ParseTreeVisitor;
	exports.ParseTreeWalker = ParseTreeWalker;
	exports.INVALID_INTERVAL = INVALID_INTERVAL;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var Utils = __webpack_require__(5);
	var Token = __webpack_require__(6).Token;
	var RuleNode = __webpack_require__(14).RuleNode;
	var ErrorNode = __webpack_require__(14).ErrorNode;
	var TerminalNode = __webpack_require__(14).TerminalNode;
	var ParserRuleContext = __webpack_require__(16).ParserRuleContext;
	var RuleContext = __webpack_require__(13).RuleContext;
	var INVALID_ALT_NUMBER = __webpack_require__(3).INVALID_ALT_NUMBER;

	/** A set of utility routines useful for all kinds of ANTLR trees. */
	function Trees() {}

	// Print out a whole tree in LISP form. {@link //getNodeText} is used on the
	//  node payloads to get the text for the nodes.  Detect
	//  parse trees and extract data appropriately.
	Trees.toStringTree = function (tree, ruleNames, recog) {
	    ruleNames = ruleNames || null;
	    recog = recog || null;
	    if (recog !== null) {
	        ruleNames = recog.ruleNames;
	    }
	    var s = Trees.getNodeText(tree, ruleNames);
	    s = Utils.escapeWhitespace(s, false);
	    var c = tree.getChildCount();
	    if (c === 0) {
	        return s;
	    }
	    var res = "(" + s + ' ';
	    if (c > 0) {
	        s = Trees.toStringTree(tree.getChild(0), ruleNames);
	        res = res.concat(s);
	    }
	    for (var i = 1; i < c; i++) {
	        s = Trees.toStringTree(tree.getChild(i), ruleNames);
	        res = res.concat(' ' + s);
	    }
	    res = res.concat(")");
	    return res;
	};

	Trees.getNodeText = function (t, ruleNames, recog) {
	    ruleNames = ruleNames || null;
	    recog = recog || null;
	    if (recog !== null) {
	        ruleNames = recog.ruleNames;
	    }
	    if (ruleNames !== null) {
	        if (t instanceof RuleContext) {
	            var altNumber = t.getAltNumber();
	            if (altNumber != INVALID_ALT_NUMBER) {
	                return ruleNames[t.ruleIndex] + ":" + altNumber;
	            }
	            return ruleNames[t.ruleIndex];
	        } else if (t instanceof ErrorNode) {
	            return t.toString();
	        } else if (t instanceof TerminalNode) {
	            if (t.symbol !== null) {
	                return t.symbol.text;
	            }
	        }
	    }
	    // no recog for rule names
	    var payload = t.getPayload();
	    if (payload instanceof Token) {
	        return payload.text;
	    }
	    return t.getPayload().toString();
	};

	// Return ordered list of all children of this node
	Trees.getChildren = function (t) {
	    var list = [];
	    for (var i = 0; i < t.getChildCount(); i++) {
	        list.push(t.getChild(i));
	    }
	    return list;
	};

	// Return a list of all ancestors of this node.  The first node of
	//  list is the root and the last is the parent of this node.
	//
	Trees.getAncestors = function (t) {
	    var ancestors = [];
	    t = t.getParent();
	    while (t !== null) {
	        ancestors = [t].concat(ancestors);
	        t = t.getParent();
	    }
	    return ancestors;
	};

	Trees.findAllTokenNodes = function (t, ttype) {
	    return Trees.findAllNodes(t, ttype, true);
	};

	Trees.findAllRuleNodes = function (t, ruleIndex) {
	    return Trees.findAllNodes(t, ruleIndex, false);
	};

	Trees.findAllNodes = function (t, index, findTokens) {
	    var nodes = [];
	    Trees._findAllNodes(t, index, findTokens, nodes);
	    return nodes;
	};

	Trees._findAllNodes = function (t, index, findTokens, nodes) {
	    // check this node (the root) first
	    if (findTokens && t instanceof TerminalNode) {
	        if (t.symbol.type === index) {
	            nodes.push(t);
	        }
	    } else if (!findTokens && t instanceof ParserRuleContext) {
	        if (t.ruleIndex === index) {
	            nodes.push(t);
	        }
	    }
	    // check children
	    for (var i = 0; i < t.getChildCount(); i++) {
	        Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
	    }
	};

	Trees.descendants = function (t) {
	    var nodes = [t];
	    for (var i = 0; i < t.getChildCount(); i++) {
	        nodes = nodes.concat(Trees.descendants(t.getChild(i)));
	    }
	    return nodes;
	};

	exports.Trees = Trees;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	//* A rule invocation record for parsing.
	//
	//  Contains all of the information about the current rule not stored in the
	//  RuleContext. It handles parse tree children list, Any ATN state
	//  tracing, and the default values available for rule indications:
	//  start, stop, rule index, current alt number, current
	//  ATN state.
	//
	//  Subclasses made for each rule and grammar track the parameters,
	//  return values, locals, and labels specific to that rule. These
	//  are the objects that are returned from rules.
	//
	//  Note text is not an actual field of a rule return value; it is computed
	//  from start and stop using the input stream's toString() method.  I
	//  could add a ctor to this so that we can pass in and store the input
	//  stream, but I'm not sure we want to do that.  It would seem to be undefined
	//  to get the .text property anyway if the rule matches tokens from multiple
	//  input streams.
	//
	//  I do not use getters for fields of objects that are used simply to
	//  group values such as this aggregate.  The getters/setters are there to
	//  satisfy the superclass interface.

	var RuleContext = __webpack_require__(13).RuleContext;
	var Tree = __webpack_require__(14);
	var INVALID_INTERVAL = Tree.INVALID_INTERVAL;
	var TerminalNode = Tree.TerminalNode;
	var TerminalNodeImpl = Tree.TerminalNodeImpl;
	var ErrorNodeImpl = Tree.ErrorNodeImpl;
	var Interval = __webpack_require__(10).Interval;

	function ParserRuleContext(parent, invokingStateNumber) {
	  parent = parent || null;
	  invokingStateNumber = invokingStateNumber || null;
	  RuleContext.call(this, parent, invokingStateNumber);
	  this.ruleIndex = -1;
	  // * If we are debugging or building a parse tree for a visitor,
	  // we need to track all of the tokens and rule invocations associated
	  // with this rule's context. This is empty for parsing w/o tree constr.
	  // operation because we don't the need to track the details about
	  // how we parse this rule.
	  // /
	  this.children = null;
	  this.start = null;
	  this.stop = null;
	  // The exception that forced this rule to return. If the rule successfully
	  // completed, this is {@code null}.
	  this.exception = null;
	}

	ParserRuleContext.prototype = Object.create(RuleContext.prototype);
	ParserRuleContext.prototype.constructor = ParserRuleContext;

	// * COPY a ctx (I'm deliberately not using copy constructor)///
	ParserRuleContext.prototype.copyFrom = function (ctx) {
	  // from RuleContext
	  this.parentCtx = ctx.parentCtx;
	  this.invokingState = ctx.invokingState;
	  this.children = null;
	  this.start = ctx.start;
	  this.stop = ctx.stop;
	  // copy any error nodes to alt label node
	  if (ctx.children) {
	    this.children = [];
	    // reset parent pointer for any error nodes
	    ctx.children.map(function (child) {
	      if (child instanceof ErrorNodeImpl) {
	        this.children.push(child);
	        child.parentCtx = this;
	      }
	    }, this);
	  }
	};

	// Double dispatch methods for listeners
	ParserRuleContext.prototype.enterRule = function (listener) {};

	ParserRuleContext.prototype.exitRule = function (listener) {};

	// * Does not set parent link; other add methods do that///
	ParserRuleContext.prototype.addChild = function (child) {
	  if (this.children === null) {
	    this.children = [];
	  }
	  this.children.push(child);
	  return child;
	};

	// * Used by enterOuterAlt to toss out a RuleContext previously added as
	// we entered a rule. If we have // label, we will need to remove
	// generic ruleContext object.
	// /
	ParserRuleContext.prototype.removeLastChild = function () {
	  if (this.children !== null) {
	    this.children.pop();
	  }
	};

	ParserRuleContext.prototype.addTokenNode = function (token) {
	  var node = new TerminalNodeImpl(token);
	  this.addChild(node);
	  node.parentCtx = this;
	  return node;
	};

	ParserRuleContext.prototype.addErrorNode = function (badToken) {
	  var node = new ErrorNodeImpl(badToken);
	  this.addChild(node);
	  node.parentCtx = this;
	  return node;
	};

	ParserRuleContext.prototype.getChild = function (i, type) {
	  type = type || null;
	  if (type === null) {
	    return this.children.length >= i ? this.children[i] : null;
	  } else {
	    for (var j = 0; j < this.children.length; j++) {
	      var child = this.children[j];
	      if (child instanceof type) {
	        if (i === 0) {
	          return child;
	        } else {
	          i -= 1;
	        }
	      }
	    }
	    return null;
	  }
	};

	ParserRuleContext.prototype.getToken = function (ttype, i) {
	  for (var j = 0; j < this.children.length; j++) {
	    var child = this.children[j];
	    if (child instanceof TerminalNode) {
	      if (child.symbol.type === ttype) {
	        if (i === 0) {
	          return child;
	        } else {
	          i -= 1;
	        }
	      }
	    }
	  }
	  return null;
	};

	ParserRuleContext.prototype.getTokens = function (ttype) {
	  if (this.children === null) {
	    return [];
	  } else {
	    var tokens = [];
	    for (var j = 0; j < this.children.length; j++) {
	      var child = this.children[j];
	      if (child instanceof TerminalNode) {
	        if (child.symbol.type === ttype) {
	          tokens.push(child);
	        }
	      }
	    }
	    return tokens;
	  }
	};

	ParserRuleContext.prototype.getTypedRuleContext = function (ctxType, i) {
	  return this.getChild(i, ctxType);
	};

	ParserRuleContext.prototype.getTypedRuleContexts = function (ctxType) {
	  if (this.children === null) {
	    return [];
	  } else {
	    var contexts = [];
	    for (var j = 0; j < this.children.length; j++) {
	      var child = this.children[j];
	      if (child instanceof ctxType) {
	        contexts.push(child);
	      }
	    }
	    return contexts;
	  }
	};

	ParserRuleContext.prototype.getChildCount = function () {
	  if (this.children === null) {
	    return 0;
	  } else {
	    return this.children.length;
	  }
	};

	ParserRuleContext.prototype.getSourceInterval = function () {
	  if (this.start === null || this.stop === null) {
	    return INVALID_INTERVAL;
	  } else {
	    return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
	  }
	};

	RuleContext.EMPTY = new ParserRuleContext();

	function InterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
	  ParserRuleContext.call(parent, invokingStateNumber);
	  this.ruleIndex = ruleIndex;
	  return this;
	}

	InterpreterRuleContext.prototype = Object.create(ParserRuleContext.prototype);
	InterpreterRuleContext.prototype.constructor = InterpreterRuleContext;

	exports.ParserRuleContext = ParserRuleContext;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var Token = __webpack_require__(6).Token;
	var ATN = __webpack_require__(3).ATN;
	var ATNType = __webpack_require__(18).ATNType;
	var ATNStates = __webpack_require__(8);
	var ATNState = ATNStates.ATNState;
	var BasicState = ATNStates.BasicState;
	var DecisionState = ATNStates.DecisionState;
	var BlockStartState = ATNStates.BlockStartState;
	var BlockEndState = ATNStates.BlockEndState;
	var LoopEndState = ATNStates.LoopEndState;
	var RuleStartState = ATNStates.RuleStartState;
	var RuleStopState = ATNStates.RuleStopState;
	var TokensStartState = ATNStates.TokensStartState;
	var PlusLoopbackState = ATNStates.PlusLoopbackState;
	var StarLoopbackState = ATNStates.StarLoopbackState;
	var StarLoopEntryState = ATNStates.StarLoopEntryState;
	var PlusBlockStartState = ATNStates.PlusBlockStartState;
	var StarBlockStartState = ATNStates.StarBlockStartState;
	var BasicBlockStartState = ATNStates.BasicBlockStartState;
	var Transitions = __webpack_require__(11);
	var Transition = Transitions.Transition;
	var AtomTransition = Transitions.AtomTransition;
	var SetTransition = Transitions.SetTransition;
	var NotSetTransition = Transitions.NotSetTransition;
	var RuleTransition = Transitions.RuleTransition;
	var RangeTransition = Transitions.RangeTransition;
	var ActionTransition = Transitions.ActionTransition;
	var EpsilonTransition = Transitions.EpsilonTransition;
	var WildcardTransition = Transitions.WildcardTransition;
	var PredicateTransition = Transitions.PredicateTransition;
	var PrecedencePredicateTransition = Transitions.PrecedencePredicateTransition;
	var IntervalSet = __webpack_require__(10).IntervalSet;
	var Interval = __webpack_require__(10).Interval;
	var ATNDeserializationOptions = __webpack_require__(19).ATNDeserializationOptions;
	var LexerActions = __webpack_require__(20);
	var LexerActionType = LexerActions.LexerActionType;
	var LexerSkipAction = LexerActions.LexerSkipAction;
	var LexerChannelAction = LexerActions.LexerChannelAction;
	var LexerCustomAction = LexerActions.LexerCustomAction;
	var LexerMoreAction = LexerActions.LexerMoreAction;
	var LexerTypeAction = LexerActions.LexerTypeAction;
	var LexerPushModeAction = LexerActions.LexerPushModeAction;
	var LexerPopModeAction = LexerActions.LexerPopModeAction;
	var LexerModeAction = LexerActions.LexerModeAction;
	// This is the earliest supported serialized UUID.
	// stick to serialized version for now, we don't need a UUID instance
	var BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E";

	// This list contains all of the currently supported UUIDs, ordered by when
	// the feature first appeared in this branch.
	var SUPPORTED_UUIDS = [BASE_SERIALIZED_UUID];

	var SERIALIZED_VERSION = 3;

	// This is the current serialized UUID.
	var SERIALIZED_UUID = BASE_SERIALIZED_UUID;

	function initArray(length, value) {
	    var tmp = [];
	    tmp[length - 1] = value;
	    return tmp.map(function (i) {
	        return value;
	    });
	}

	function ATNDeserializer(options) {

	    if (options === undefined || options === null) {
	        options = ATNDeserializationOptions.defaultOptions;
	    }
	    this.deserializationOptions = options;
	    this.stateFactories = null;
	    this.actionFactories = null;

	    return this;
	}

	// Determines if a particular serialized representation of an ATN supports
	// a particular feature, identified by the {@link UUID} used for serializing
	// the ATN at the time the feature was first introduced.
	//
	// @param feature The {@link UUID} marking the first time the feature was
	// supported in the serialized ATN.
	// @param actualUuid The {@link UUID} of the actual serialized ATN which is
	// currently being deserialized.
	// @return {@code true} if the {@code actualUuid} value represents a
	// serialized ATN at or after the feature identified by {@code feature} was
	// introduced; otherwise, {@code false}.

	ATNDeserializer.prototype.isFeatureSupported = function (feature, actualUuid) {
	    var idx1 = SUPPORTED_UUIDS.index(feature);
	    if (idx1 < 0) {
	        return false;
	    }
	    var idx2 = SUPPORTED_UUIDS.index(actualUuid);
	    return idx2 >= idx1;
	};

	ATNDeserializer.prototype.deserialize = function (data) {
	    this.reset(data);
	    this.checkVersion();
	    this.checkUUID();
	    var atn = this.readATN();
	    this.readStates(atn);
	    this.readRules(atn);
	    this.readModes(atn);
	    var sets = this.readSets(atn);
	    this.readEdges(atn, sets);
	    this.readDecisions(atn);
	    this.readLexerActions(atn);
	    this.markPrecedenceDecisions(atn);
	    this.verifyATN(atn);
	    if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER) {
	        this.generateRuleBypassTransitions(atn);
	        // re-verify after modification
	        this.verifyATN(atn);
	    }
	    return atn;
	};

	ATNDeserializer.prototype.reset = function (data) {
	    var adjust = function adjust(c) {
	        var v = c.charCodeAt(0);
	        return v > 1 ? v - 2 : -1;
	    };
	    var temp = data.split("").map(adjust);
	    // don't adjust the first value since that's the version number
	    temp[0] = data.charCodeAt(0);
	    this.data = temp;
	    this.pos = 0;
	};

	ATNDeserializer.prototype.checkVersion = function () {
	    var version = this.readInt();
	    if (version !== SERIALIZED_VERSION) {
	        throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
	    }
	};

	ATNDeserializer.prototype.checkUUID = function () {
	    var uuid = this.readUUID();
	    if (SUPPORTED_UUIDS.indexOf(uuid) < 0) {
	        throw "Could not deserialize ATN with UUID: " + uuid + " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID;
	    }
	    this.uuid = uuid;
	};

	ATNDeserializer.prototype.readATN = function () {
	    var grammarType = this.readInt();
	    var maxTokenType = this.readInt();
	    return new ATN(grammarType, maxTokenType);
	};

	ATNDeserializer.prototype.readStates = function (atn) {
	    var j, pair, stateNumber;
	    var loopBackStateNumbers = [];
	    var endStateNumbers = [];
	    var nstates = this.readInt();
	    for (var i = 0; i < nstates; i++) {
	        var stype = this.readInt();
	        // ignore bad type of states
	        if (stype === ATNState.INVALID_TYPE) {
	            atn.addState(null);
	            continue;
	        }
	        var ruleIndex = this.readInt();
	        if (ruleIndex === 0xFFFF) {
	            ruleIndex = -1;
	        }
	        var s = this.stateFactory(stype, ruleIndex);
	        if (stype === ATNState.LOOP_END) {
	            // special case
	            var loopBackStateNumber = this.readInt();
	            loopBackStateNumbers.push([s, loopBackStateNumber]);
	        } else if (s instanceof BlockStartState) {
	            var endStateNumber = this.readInt();
	            endStateNumbers.push([s, endStateNumber]);
	        }
	        atn.addState(s);
	    }
	    // delay the assignment of loop back and end states until we know all the
	    // state instances have been initialized
	    for (j = 0; j < loopBackStateNumbers.length; j++) {
	        pair = loopBackStateNumbers[j];
	        pair[0].loopBackState = atn.states[pair[1]];
	    }

	    for (j = 0; j < endStateNumbers.length; j++) {
	        pair = endStateNumbers[j];
	        pair[0].endState = atn.states[pair[1]];
	    }

	    var numNonGreedyStates = this.readInt();
	    for (j = 0; j < numNonGreedyStates; j++) {
	        stateNumber = this.readInt();
	        atn.states[stateNumber].nonGreedy = true;
	    }

	    var numPrecedenceStates = this.readInt();
	    for (j = 0; j < numPrecedenceStates; j++) {
	        stateNumber = this.readInt();
	        atn.states[stateNumber].isPrecedenceRule = true;
	    }
	};

	ATNDeserializer.prototype.readRules = function (atn) {
	    var i;
	    var nrules = this.readInt();
	    if (atn.grammarType === ATNType.LEXER) {
	        atn.ruleToTokenType = initArray(nrules, 0);
	    }
	    atn.ruleToStartState = initArray(nrules, 0);
	    for (i = 0; i < nrules; i++) {
	        var s = this.readInt();
	        var startState = atn.states[s];
	        atn.ruleToStartState[i] = startState;
	        if (atn.grammarType === ATNType.LEXER) {
	            var tokenType = this.readInt();
	            if (tokenType === 0xFFFF) {
	                tokenType = Token.EOF;
	            }
	            atn.ruleToTokenType[i] = tokenType;
	        }
	    }
	    atn.ruleToStopState = initArray(nrules, 0);
	    for (i = 0; i < atn.states.length; i++) {
	        var state = atn.states[i];
	        if (!(state instanceof RuleStopState)) {
	            continue;
	        }
	        atn.ruleToStopState[state.ruleIndex] = state;
	        atn.ruleToStartState[state.ruleIndex].stopState = state;
	    }
	};

	ATNDeserializer.prototype.readModes = function (atn) {
	    var nmodes = this.readInt();
	    for (var i = 0; i < nmodes; i++) {
	        var s = this.readInt();
	        atn.modeToStartState.push(atn.states[s]);
	    }
	};

	ATNDeserializer.prototype.readSets = function (atn) {
	    var sets = [];
	    var m = this.readInt();
	    for (var i = 0; i < m; i++) {
	        var iset = new IntervalSet();
	        sets.push(iset);
	        var n = this.readInt();
	        var containsEof = this.readInt();
	        if (containsEof !== 0) {
	            iset.addOne(-1);
	        }
	        for (var j = 0; j < n; j++) {
	            var i1 = this.readInt();
	            var i2 = this.readInt();
	            iset.addRange(i1, i2);
	        }
	    }
	    return sets;
	};

	ATNDeserializer.prototype.readEdges = function (atn, sets) {
	    var i, j, state, trans, target;
	    var nedges = this.readInt();
	    for (i = 0; i < nedges; i++) {
	        var src = this.readInt();
	        var trg = this.readInt();
	        var ttype = this.readInt();
	        var arg1 = this.readInt();
	        var arg2 = this.readInt();
	        var arg3 = this.readInt();
	        trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
	        var srcState = atn.states[src];
	        srcState.addTransition(trans);
	    }
	    // edges for rule stop states can be derived, so they aren't serialized
	    for (i = 0; i < atn.states.length; i++) {
	        state = atn.states[i];
	        for (j = 0; j < state.transitions.length; j++) {
	            var t = state.transitions[j];
	            if (!(t instanceof RuleTransition)) {
	                continue;
	            }
	            var outermostPrecedenceReturn = -1;
	            if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
	                if (t.precedence === 0) {
	                    outermostPrecedenceReturn = t.target.ruleIndex;
	                }
	            }

	            trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
	            atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
	        }
	    }

	    for (i = 0; i < atn.states.length; i++) {
	        state = atn.states[i];
	        if (state instanceof BlockStartState) {
	            // we need to know the end state to set its start state
	            if (state.endState === null) {
	                throw "IllegalState";
	            }
	            // block end states can only be associated to a single block start
	            // state
	            if (state.endState.startState !== null) {
	                throw "IllegalState";
	            }
	            state.endState.startState = state;
	        }
	        if (state instanceof PlusLoopbackState) {
	            for (j = 0; j < state.transitions.length; j++) {
	                target = state.transitions[j].target;
	                if (target instanceof PlusBlockStartState) {
	                    target.loopBackState = state;
	                }
	            }
	        } else if (state instanceof StarLoopbackState) {
	            for (j = 0; j < state.transitions.length; j++) {
	                target = state.transitions[j].target;
	                if (target instanceof StarLoopEntryState) {
	                    target.loopBackState = state;
	                }
	            }
	        }
	    }
	};

	ATNDeserializer.prototype.readDecisions = function (atn) {
	    var ndecisions = this.readInt();
	    for (var i = 0; i < ndecisions; i++) {
	        var s = this.readInt();
	        var decState = atn.states[s];
	        atn.decisionToState.push(decState);
	        decState.decision = i;
	    }
	};

	ATNDeserializer.prototype.readLexerActions = function (atn) {
	    if (atn.grammarType === ATNType.LEXER) {
	        var count = this.readInt();
	        atn.lexerActions = initArray(count, null);
	        for (var i = 0; i < count; i++) {
	            var actionType = this.readInt();
	            var data1 = this.readInt();
	            if (data1 === 0xFFFF) {
	                data1 = -1;
	            }
	            var data2 = this.readInt();
	            if (data2 === 0xFFFF) {
	                data2 = -1;
	            }
	            var lexerAction = this.lexerActionFactory(actionType, data1, data2);
	            atn.lexerActions[i] = lexerAction;
	        }
	    }
	};

	ATNDeserializer.prototype.generateRuleBypassTransitions = function (atn) {
	    var i;
	    var count = atn.ruleToStartState.length;
	    for (i = 0; i < count; i++) {
	        atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
	    }
	    for (i = 0; i < count; i++) {
	        this.generateRuleBypassTransition(atn, i);
	    }
	};

	ATNDeserializer.prototype.generateRuleBypassTransition = function (atn, idx) {
	    var i, state;
	    var bypassStart = new BasicBlockStartState();
	    bypassStart.ruleIndex = idx;
	    atn.addState(bypassStart);

	    var bypassStop = new BlockEndState();
	    bypassStop.ruleIndex = idx;
	    atn.addState(bypassStop);

	    bypassStart.endState = bypassStop;
	    atn.defineDecisionState(bypassStart);

	    bypassStop.startState = bypassStart;

	    var excludeTransition = null;
	    var endState = null;

	    if (atn.ruleToStartState[idx].isPrecedenceRule) {
	        // wrap from the beginning of the rule to the StarLoopEntryState
	        endState = null;
	        for (i = 0; i < atn.states.length; i++) {
	            state = atn.states[i];
	            if (this.stateIsEndStateFor(state, idx)) {
	                endState = state;
	                excludeTransition = state.loopBackState.transitions[0];
	                break;
	            }
	        }
	        if (excludeTransition === null) {
	            throw "Couldn't identify final state of the precedence rule prefix section.";
	        }
	    } else {
	        endState = atn.ruleToStopState[idx];
	    }

	    // all non-excluded transitions that currently target end state need to
	    // target blockEnd instead
	    for (i = 0; i < atn.states.length; i++) {
	        state = atn.states[i];
	        for (var j = 0; j < state.transitions.length; j++) {
	            var transition = state.transitions[j];
	            if (transition === excludeTransition) {
	                continue;
	            }
	            if (transition.target === endState) {
	                transition.target = bypassStop;
	            }
	        }
	    }

	    // all transitions leaving the rule start state need to leave blockStart
	    // instead
	    var ruleToStartState = atn.ruleToStartState[idx];
	    var count = ruleToStartState.transitions.length;
	    while (count > 0) {
	        bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
	        ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
	    }
	    // link the new states
	    atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
	    bypassStop.addTransition(new EpsilonTransition(endState));

	    var matchState = new BasicState();
	    atn.addState(matchState);
	    matchState.addTransition(new AtomTransition(bypassStop, atn.ruleToTokenType[idx]));
	    bypassStart.addTransition(new EpsilonTransition(matchState));
	};

	ATNDeserializer.prototype.stateIsEndStateFor = function (state, idx) {
	    if (state.ruleIndex !== idx) {
	        return null;
	    }
	    if (!(state instanceof StarLoopEntryState)) {
	        return null;
	    }
	    var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
	    if (!(maybeLoopEndState instanceof LoopEndState)) {
	        return null;
	    }
	    if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
	        return state;
	    } else {
	        return null;
	    }
	};

	//
	// Analyze the {@link StarLoopEntryState} states in the specified ATN to set
	// the {@link StarLoopEntryState//isPrecedenceDecision} field to the
	// correct value.
	//
	// @param atn The ATN.
	//
	ATNDeserializer.prototype.markPrecedenceDecisions = function (atn) {
	    for (var i = 0; i < atn.states.length; i++) {
	        var state = atn.states[i];
	        if (!(state instanceof StarLoopEntryState)) {
	            continue;
	        }
	        // We analyze the ATN to determine if this ATN decision state is the
	        // decision for the closure block that determines whether a
	        // precedence rule should continue or complete.
	        //
	        if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
	            var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
	            if (maybeLoopEndState instanceof LoopEndState) {
	                if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
	                    state.isPrecedenceDecision = true;
	                }
	            }
	        }
	    }
	};

	ATNDeserializer.prototype.verifyATN = function (atn) {
	    if (!this.deserializationOptions.verifyATN) {
	        return;
	    }
	    // verify assumptions
	    for (var i = 0; i < atn.states.length; i++) {
	        var state = atn.states[i];
	        if (state === null) {
	            continue;
	        }
	        this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
	        if (state instanceof PlusBlockStartState) {
	            this.checkCondition(state.loopBackState !== null);
	        } else if (state instanceof StarLoopEntryState) {
	            this.checkCondition(state.loopBackState !== null);
	            this.checkCondition(state.transitions.length === 2);
	            if (state.transitions[0].target instanceof StarBlockStartState) {
	                this.checkCondition(state.transitions[1].target instanceof LoopEndState);
	                this.checkCondition(!state.nonGreedy);
	            } else if (state.transitions[0].target instanceof LoopEndState) {
	                this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
	                this.checkCondition(state.nonGreedy);
	            } else {
	                throw "IllegalState";
	            }
	        } else if (state instanceof StarLoopbackState) {
	            this.checkCondition(state.transitions.length === 1);
	            this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
	        } else if (state instanceof LoopEndState) {
	            this.checkCondition(state.loopBackState !== null);
	        } else if (state instanceof RuleStartState) {
	            this.checkCondition(state.stopState !== null);
	        } else if (state instanceof BlockStartState) {
	            this.checkCondition(state.endState !== null);
	        } else if (state instanceof BlockEndState) {
	            this.checkCondition(state.startState !== null);
	        } else if (state instanceof DecisionState) {
	            this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
	        } else {
	            this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
	        }
	    }
	};

	ATNDeserializer.prototype.checkCondition = function (condition, message) {
	    if (!condition) {
	        if (message === undefined || message === null) {
	            message = "IllegalState";
	        }
	        throw message;
	    }
	};

	ATNDeserializer.prototype.readInt = function () {
	    return this.data[this.pos++];
	};

	ATNDeserializer.prototype.readInt32 = function () {
	    var low = this.readInt();
	    var high = this.readInt();
	    return low | high << 16;
	};

	ATNDeserializer.prototype.readLong = function () {
	    var low = this.readInt32();
	    var high = this.readInt32();
	    return low & 0x00000000FFFFFFFF | high << 32;
	};

	function createByteToHex() {
	    var bth = [];
	    for (var i = 0; i < 256; i++) {
	        bth[i] = (i + 0x100).toString(16).substr(1).toUpperCase();
	    }
	    return bth;
	}

	var byteToHex = createByteToHex();

	ATNDeserializer.prototype.readUUID = function () {
	    var bb = [];
	    for (var i = 7; i >= 0; i--) {
	        var int = this.readInt();
	        /* jshint bitwise: false */
	        bb[2 * i + 1] = int & 0xFF;
	        bb[2 * i] = int >> 8 & 0xFF;
	    }
	    return byteToHex[bb[0]] + byteToHex[bb[1]] + byteToHex[bb[2]] + byteToHex[bb[3]] + '-' + byteToHex[bb[4]] + byteToHex[bb[5]] + '-' + byteToHex[bb[6]] + byteToHex[bb[7]] + '-' + byteToHex[bb[8]] + byteToHex[bb[9]] + '-' + byteToHex[bb[10]] + byteToHex[bb[11]] + byteToHex[bb[12]] + byteToHex[bb[13]] + byteToHex[bb[14]] + byteToHex[bb[15]];
	};

	ATNDeserializer.prototype.edgeFactory = function (atn, type, src, trg, arg1, arg2, arg3, sets) {
	    var target = atn.states[trg];
	    switch (type) {
	        case Transition.EPSILON:
	            return new EpsilonTransition(target);
	        case Transition.RANGE:
	            return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
	        case Transition.RULE:
	            return new RuleTransition(atn.states[arg1], arg2, arg3, target);
	        case Transition.PREDICATE:
	            return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
	        case Transition.PRECEDENCE:
	            return new PrecedencePredicateTransition(target, arg1);
	        case Transition.ATOM:
	            return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);
	        case Transition.ACTION:
	            return new ActionTransition(target, arg1, arg2, arg3 !== 0);
	        case Transition.SET:
	            return new SetTransition(target, sets[arg1]);
	        case Transition.NOT_SET:
	            return new NotSetTransition(target, sets[arg1]);
	        case Transition.WILDCARD:
	            return new WildcardTransition(target);
	        default:
	            throw "The specified transition type: " + type + " is not valid.";
	    }
	};

	ATNDeserializer.prototype.stateFactory = function (type, ruleIndex) {
	    if (this.stateFactories === null) {
	        var sf = [];
	        sf[ATNState.INVALID_TYPE] = null;
	        sf[ATNState.BASIC] = function () {
	            return new BasicState();
	        };
	        sf[ATNState.RULE_START] = function () {
	            return new RuleStartState();
	        };
	        sf[ATNState.BLOCK_START] = function () {
	            return new BasicBlockStartState();
	        };
	        sf[ATNState.PLUS_BLOCK_START] = function () {
	            return new PlusBlockStartState();
	        };
	        sf[ATNState.STAR_BLOCK_START] = function () {
	            return new StarBlockStartState();
	        };
	        sf[ATNState.TOKEN_START] = function () {
	            return new TokensStartState();
	        };
	        sf[ATNState.RULE_STOP] = function () {
	            return new RuleStopState();
	        };
	        sf[ATNState.BLOCK_END] = function () {
	            return new BlockEndState();
	        };
	        sf[ATNState.STAR_LOOP_BACK] = function () {
	            return new StarLoopbackState();
	        };
	        sf[ATNState.STAR_LOOP_ENTRY] = function () {
	            return new StarLoopEntryState();
	        };
	        sf[ATNState.PLUS_LOOP_BACK] = function () {
	            return new PlusLoopbackState();
	        };
	        sf[ATNState.LOOP_END] = function () {
	            return new LoopEndState();
	        };
	        this.stateFactories = sf;
	    }
	    if (type > this.stateFactories.length || this.stateFactories[type] === null) {
	        throw "The specified state type " + type + " is not valid.";
	    } else {
	        var s = this.stateFactories[type]();
	        if (s !== null) {
	            s.ruleIndex = ruleIndex;
	            return s;
	        }
	    }
	};

	ATNDeserializer.prototype.lexerActionFactory = function (type, data1, data2) {
	    if (this.actionFactories === null) {
	        var af = [];
	        af[LexerActionType.CHANNEL] = function (data1, data2) {
	            return new LexerChannelAction(data1);
	        };
	        af[LexerActionType.CUSTOM] = function (data1, data2) {
	            return new LexerCustomAction(data1, data2);
	        };
	        af[LexerActionType.MODE] = function (data1, data2) {
	            return new LexerModeAction(data1);
	        };
	        af[LexerActionType.MORE] = function (data1, data2) {
	            return LexerMoreAction.INSTANCE;
	        };
	        af[LexerActionType.POP_MODE] = function (data1, data2) {
	            return LexerPopModeAction.INSTANCE;
	        };
	        af[LexerActionType.PUSH_MODE] = function (data1, data2) {
	            return new LexerPushModeAction(data1);
	        };
	        af[LexerActionType.SKIP] = function (data1, data2) {
	            return LexerSkipAction.INSTANCE;
	        };
	        af[LexerActionType.TYPE] = function (data1, data2) {
	            return new LexerTypeAction(data1);
	        };
	        this.actionFactories = af;
	    }
	    if (type > this.actionFactories.length || this.actionFactories[type] === null) {
	        throw "The specified lexer action type " + type + " is not valid.";
	    } else {
	        return this.actionFactories[type](data1, data2);
	    }
	};

	exports.ATNDeserializer = ATNDeserializer;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// Represents the type of recognizer an ATN applies to.

	function ATNType() {}

	ATNType.LEXER = 0;
	ATNType.PARSER = 1;

	exports.ATNType = ATNType;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	function ATNDeserializationOptions(copyFrom) {
	  if (copyFrom === undefined) {
	    copyFrom = null;
	  }
	  this.readOnly = false;
	  this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
	  this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;

	  return this;
	}

	ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
	ATNDeserializationOptions.defaultOptions.readOnly = true;

	//    def __setattr__(self, key, value):
	//        if key!="readOnly" and self.readOnly:
	//            raise Exception("The object is read only.")
	//        super(type(self), self).__setattr__(key,value)

	exports.ATNDeserializationOptions = ATNDeserializationOptions;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	function LexerActionType() {}

	LexerActionType.CHANNEL = 0; //The type of a {@link LexerChannelAction} action.
	LexerActionType.CUSTOM = 1; //The type of a {@link LexerCustomAction} action.
	LexerActionType.MODE = 2; //The type of a {@link LexerModeAction} action.
	LexerActionType.MORE = 3; //The type of a {@link LexerMoreAction} action.
	LexerActionType.POP_MODE = 4; //The type of a {@link LexerPopModeAction} action.
	LexerActionType.PUSH_MODE = 5; //The type of a {@link LexerPushModeAction} action.
	LexerActionType.SKIP = 6; //The type of a {@link LexerSkipAction} action.
	LexerActionType.TYPE = 7; //The type of a {@link LexerTypeAction} action.

	function LexerAction(action) {
	    this.actionType = action;
	    this.isPositionDependent = false;
	    return this;
	}

	LexerAction.prototype.hashCode = function () {
	    var hash = new Hash();
	    this.updateHashCode(hash);
	    return hash.finish();
	};

	LexerAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType);
	};

	LexerAction.prototype.equals = function (other) {
	    return this === other;
	};

	//
	// Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
	//
	// <p>The {@code skip} command does not have any parameters, so this action is
	// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
	function LexerSkipAction() {
	    LexerAction.call(this, LexerActionType.SKIP);
	    return this;
	}

	LexerSkipAction.prototype = Object.create(LexerAction.prototype);
	LexerSkipAction.prototype.constructor = LexerSkipAction;

	// Provides a singleton instance of this parameterless lexer action.
	LexerSkipAction.INSTANCE = new LexerSkipAction();

	LexerSkipAction.prototype.execute = function (lexer) {
	    lexer.skip();
	};

	LexerSkipAction.prototype.toString = function () {
	    return "skip";
	};

	//  Implements the {@code type} lexer action by calling {@link Lexer//setType}
	// with the assigned type.
	function LexerTypeAction(type) {
	    LexerAction.call(this, LexerActionType.TYPE);
	    this.type = type;
	    return this;
	}

	LexerTypeAction.prototype = Object.create(LexerAction.prototype);
	LexerTypeAction.prototype.constructor = LexerTypeAction;

	LexerTypeAction.prototype.execute = function (lexer) {
	    lexer.type = this.type;
	};

	LexerTypeAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.type);
	};

	LexerTypeAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerTypeAction)) {
	        return false;
	    } else {
	        return this.type === other.type;
	    }
	};

	LexerTypeAction.prototype.toString = function () {
	    return "type(" + this.type + ")";
	};

	// Implements the {@code pushMode} lexer action by calling
	// {@link Lexer//pushMode} with the assigned mode.
	function LexerPushModeAction(mode) {
	    LexerAction.call(this, LexerActionType.PUSH_MODE);
	    this.mode = mode;
	    return this;
	}

	LexerPushModeAction.prototype = Object.create(LexerAction.prototype);
	LexerPushModeAction.prototype.constructor = LexerPushModeAction;

	// <p>This action is implemented by calling {@link Lexer//pushMode} with the
	// value provided by {@link //getMode}.</p>
	LexerPushModeAction.prototype.execute = function (lexer) {
	    lexer.pushMode(this.mode);
	};

	LexerPushModeAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.mode);
	};

	LexerPushModeAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerPushModeAction)) {
	        return false;
	    } else {
	        return this.mode === other.mode;
	    }
	};

	LexerPushModeAction.prototype.toString = function () {
	    return "pushMode(" + this.mode + ")";
	};

	// Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
	//
	// <p>The {@code popMode} command does not have any parameters, so this action is
	// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
	function LexerPopModeAction() {
	    LexerAction.call(this, LexerActionType.POP_MODE);
	    return this;
	}

	LexerPopModeAction.prototype = Object.create(LexerAction.prototype);
	LexerPopModeAction.prototype.constructor = LexerPopModeAction;

	LexerPopModeAction.INSTANCE = new LexerPopModeAction();

	// <p>This action is implemented by calling {@link Lexer//popMode}.</p>
	LexerPopModeAction.prototype.execute = function (lexer) {
	    lexer.popMode();
	};

	LexerPopModeAction.prototype.toString = function () {
	    return "popMode";
	};

	// Implements the {@code more} lexer action by calling {@link Lexer//more}.
	//
	// <p>The {@code more} command does not have any parameters, so this action is
	// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
	function LexerMoreAction() {
	    LexerAction.call(this, LexerActionType.MORE);
	    return this;
	}

	LexerMoreAction.prototype = Object.create(LexerAction.prototype);
	LexerMoreAction.prototype.constructor = LexerMoreAction;

	LexerMoreAction.INSTANCE = new LexerMoreAction();

	// <p>This action is implemented by calling {@link Lexer//popMode}.</p>
	LexerMoreAction.prototype.execute = function (lexer) {
	    lexer.more();
	};

	LexerMoreAction.prototype.toString = function () {
	    return "more";
	};

	// Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
	// the assigned mode.
	function LexerModeAction(mode) {
	    LexerAction.call(this, LexerActionType.MODE);
	    this.mode = mode;
	    return this;
	}

	LexerModeAction.prototype = Object.create(LexerAction.prototype);
	LexerModeAction.prototype.constructor = LexerModeAction;

	// <p>This action is implemented by calling {@link Lexer//mode} with the
	// value provided by {@link //getMode}.</p>
	LexerModeAction.prototype.execute = function (lexer) {
	    lexer.mode(this.mode);
	};

	LexerModeAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.mode);
	};

	LexerModeAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerModeAction)) {
	        return false;
	    } else {
	        return this.mode === other.mode;
	    }
	};

	LexerModeAction.prototype.toString = function () {
	    return "mode(" + this.mode + ")";
	};

	// Executes a custom lexer action by calling {@link Recognizer//action} with the
	// rule and action indexes assigned to the custom action. The implementation of
	// a custom action is added to the generated code for the lexer in an override
	// of {@link Recognizer//action} when the grammar is compiled.
	//
	// <p>This class may represent embedded actions created with the <code>{...}</code>
	// syntax in ANTLR 4, as well as actions created for lexer commands where the
	// command argument could not be evaluated when the grammar was compiled.</p>


	// Constructs a custom lexer action with the specified rule and action
	// indexes.
	//
	// @param ruleIndex The rule index to use for calls to
	// {@link Recognizer//action}.
	// @param actionIndex The action index to use for calls to
	// {@link Recognizer//action}.

	function LexerCustomAction(ruleIndex, actionIndex) {
	    LexerAction.call(this, LexerActionType.CUSTOM);
	    this.ruleIndex = ruleIndex;
	    this.actionIndex = actionIndex;
	    this.isPositionDependent = true;
	    return this;
	}

	LexerCustomAction.prototype = Object.create(LexerAction.prototype);
	LexerCustomAction.prototype.constructor = LexerCustomAction;

	// <p>Custom actions are implemented by calling {@link Lexer//action} with the
	// appropriate rule and action indexes.</p>
	LexerCustomAction.prototype.execute = function (lexer) {
	    lexer.action(null, this.ruleIndex, this.actionIndex);
	};

	LexerCustomAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.ruleIndex, this.actionIndex);
	};

	LexerCustomAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerCustomAction)) {
	        return false;
	    } else {
	        return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
	    }
	};

	// Implements the {@code channel} lexer action by calling
	// {@link Lexer//setChannel} with the assigned channel.
	// Constructs a new {@code channel} action with the specified channel value.
	// @param channel The channel value to pass to {@link Lexer//setChannel}.
	function LexerChannelAction(channel) {
	    LexerAction.call(this, LexerActionType.CHANNEL);
	    this.channel = channel;
	    return this;
	}

	LexerChannelAction.prototype = Object.create(LexerAction.prototype);
	LexerChannelAction.prototype.constructor = LexerChannelAction;

	// <p>This action is implemented by calling {@link Lexer//setChannel} with the
	// value provided by {@link //getChannel}.</p>
	LexerChannelAction.prototype.execute = function (lexer) {
	    lexer._channel = this.channel;
	};

	LexerChannelAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.channel);
	};

	LexerChannelAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerChannelAction)) {
	        return false;
	    } else {
	        return this.channel === other.channel;
	    }
	};

	LexerChannelAction.prototype.toString = function () {
	    return "channel(" + this.channel + ")";
	};

	// This implementation of {@link LexerAction} is used for tracking input offsets
	// for position-dependent actions within a {@link LexerActionExecutor}.
	//
	// <p>This action is not serialized as part of the ATN, and is only required for
	// position-dependent lexer actions which appear at a location other than the
	// end of a rule. For more information about DFA optimizations employed for
	// lexer actions, see {@link LexerActionExecutor//append} and
	// {@link LexerActionExecutor//fixOffsetBeforeMatch}.</p>

	// Constructs a new indexed custom action by associating a character offset
	// with a {@link LexerAction}.
	//
	// <p>Note: This class is only required for lexer actions for which
	// {@link LexerAction//isPositionDependent} returns {@code true}.</p>
	//
	// @param offset The offset into the input {@link CharStream}, relative to
	// the token start index, at which the specified lexer action should be
	// executed.
	// @param action The lexer action to execute at a particular offset in the
	// input {@link CharStream}.
	function LexerIndexedCustomAction(offset, action) {
	    LexerAction.call(this, action.actionType);
	    this.offset = offset;
	    this.action = action;
	    this.isPositionDependent = true;
	    return this;
	}

	LexerIndexedCustomAction.prototype = Object.create(LexerAction.prototype);
	LexerIndexedCustomAction.prototype.constructor = LexerIndexedCustomAction;

	// <p>This method calls {@link //execute} on the result of {@link //getAction}
	// using the provided {@code lexer}.</p>
	LexerIndexedCustomAction.prototype.execute = function (lexer) {
	    // assume the input stream position was properly set by the calling code
	    this.action.execute(lexer);
	};

	LexerIndexedCustomAction.prototype.updateHashCode = function (hash) {
	    hash.update(this.actionType, this.offset, this.action);
	};

	LexerIndexedCustomAction.prototype.equals = function (other) {
	    if (this === other) {
	        return true;
	    } else if (!(other instanceof LexerIndexedCustomAction)) {
	        return false;
	    } else {
	        return this.offset === other.offset && this.action === other.action;
	    }
	};

	exports.LexerActionType = LexerActionType;
	exports.LexerSkipAction = LexerSkipAction;
	exports.LexerChannelAction = LexerChannelAction;
	exports.LexerCustomAction = LexerCustomAction;
	exports.LexerIndexedCustomAction = LexerIndexedCustomAction;
	exports.LexerMoreAction = LexerMoreAction;
	exports.LexerTypeAction = LexerTypeAction;
	exports.LexerPushModeAction = LexerPushModeAction;
	exports.LexerPopModeAction = LexerPopModeAction;
	exports.LexerModeAction = LexerModeAction;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// When we hit an accept state in either the DFA or the ATN, we
	//  have to notify the character stream to start buffering characters
	//  via {@link IntStream//mark} and record the current state. The current sim state
	//  includes the current index into the input, the current line,
	//  and current character position in that line. Note that the Lexer is
	//  tracking the starting line and characterization of the token. These
	//  variables track the "state" of the simulator when it hits an accept state.
	//
	//  <p>We track these variables separately for the DFA and ATN simulation
	//  because the DFA simulation often has to fail over to the ATN
	//  simulation. If the ATN simulation fails, we need the DFA to fall
	//  back to its previously accepted state, if any. If the ATN succeeds,
	//  then the ATN does the accept and the DFA simulator that invoked it
	//  can simply return the predicted token type.</p>
	///

	var Token = __webpack_require__(6).Token;
	var Lexer = __webpack_require__(22).Lexer;
	var ATN = __webpack_require__(3).ATN;
	var ATNSimulator = __webpack_require__(27).ATNSimulator;
	var DFAState = __webpack_require__(28).DFAState;
	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var OrderedATNConfigSet = __webpack_require__(29).OrderedATNConfigSet;
	var PredictionContext = __webpack_require__(12).PredictionContext;
	var SingletonPredictionContext = __webpack_require__(12).SingletonPredictionContext;
	var RuleStopState = __webpack_require__(8).RuleStopState;
	var LexerATNConfig = __webpack_require__(7).LexerATNConfig;
	var Transition = __webpack_require__(11).Transition;
	var LexerActionExecutor = __webpack_require__(30).LexerActionExecutor;
	var LexerNoViableAltException = __webpack_require__(26).LexerNoViableAltException;

	function resetSimState(sim) {
		sim.index = -1;
		sim.line = 0;
		sim.column = -1;
		sim.dfaState = null;
	}

	function SimState() {
		resetSimState(this);
		return this;
	}

	SimState.prototype.reset = function () {
		resetSimState(this);
	};

	function LexerATNSimulator(recog, atn, decisionToDFA, sharedContextCache) {
		ATNSimulator.call(this, atn, sharedContextCache);
		this.decisionToDFA = decisionToDFA;
		this.recog = recog;
		// The current token's starting index into the character stream.
		// Shared across DFA to ATN simulation in case the ATN fails and the
		// DFA did not have a previous accept state. In this case, we use the
		// ATN-generated exception object.
		this.startIndex = -1;
		// line number 1..n within the input///
		this.line = 1;
		// The index of the character relative to the beginning of the line
		// 0..n-1///
		this.column = 0;
		this.mode = Lexer.DEFAULT_MODE;
		// Used during DFA/ATN exec to record the most recent accept configuration
		// info
		this.prevAccept = new SimState();
		// done
		return this;
	}

	LexerATNSimulator.prototype = Object.create(ATNSimulator.prototype);
	LexerATNSimulator.prototype.constructor = LexerATNSimulator;

	LexerATNSimulator.debug = false;
	LexerATNSimulator.dfa_debug = false;

	LexerATNSimulator.MIN_DFA_EDGE = 0;
	LexerATNSimulator.MAX_DFA_EDGE = 127; // forces unicode to stay in ATN

	LexerATNSimulator.match_calls = 0;

	LexerATNSimulator.prototype.copyState = function (simulator) {
		this.column = simulator.column;
		this.line = simulator.line;
		this.mode = simulator.mode;
		this.startIndex = simulator.startIndex;
	};

	LexerATNSimulator.prototype.match = function (input, mode) {
		this.match_calls += 1;
		this.mode = mode;
		var mark = input.mark();
		try {
			this.startIndex = input.index;
			this.prevAccept.reset();
			var dfa = this.decisionToDFA[mode];
			if (dfa.s0 === null) {
				return this.matchATN(input);
			} else {
				return this.execATN(input, dfa.s0);
			}
		} finally {
			input.release(mark);
		}
	};

	LexerATNSimulator.prototype.reset = function () {
		this.prevAccept.reset();
		this.startIndex = -1;
		this.line = 1;
		this.column = 0;
		this.mode = Lexer.DEFAULT_MODE;
	};

	LexerATNSimulator.prototype.matchATN = function (input) {
		var startState = this.atn.modeToStartState[this.mode];

		if (LexerATNSimulator.debug) {
			console.log("matchATN mode " + this.mode + " start: " + startState);
		}
		var old_mode = this.mode;
		var s0_closure = this.computeStartState(input, startState);
		var suppressEdge = s0_closure.hasSemanticContext;
		s0_closure.hasSemanticContext = false;

		var next = this.addDFAState(s0_closure);
		if (!suppressEdge) {
			this.decisionToDFA[this.mode].s0 = next;
		}

		var predict = this.execATN(input, next);

		if (LexerATNSimulator.debug) {
			console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
		}
		return predict;
	};

	LexerATNSimulator.prototype.execATN = function (input, ds0) {
		if (LexerATNSimulator.debug) {
			console.log("start state closure=" + ds0.configs);
		}
		if (ds0.isAcceptState) {
			// allow zero-length tokens
			this.captureSimState(this.prevAccept, input, ds0);
		}
		var t = input.LA(1);
		var s = ds0; // s is current/from DFA state

		while (true) {
			// while more work
			if (LexerATNSimulator.debug) {
				console.log("execATN loop starting closure: " + s.configs);
			}

			// As we move src->trg, src->trg, we keep track of the previous trg to
			// avoid looking up the DFA state again, which is expensive.
			// If the previous target was already part of the DFA, we might
			// be able to avoid doing a reach operation upon t. If s!=null,
			// it means that semantic predicates didn't prevent us from
			// creating a DFA state. Once we know s!=null, we check to see if
			// the DFA state has an edge already for t. If so, we can just reuse
			// it's configuration set; there's no point in re-computing it.
			// This is kind of like doing DFA simulation within the ATN
			// simulation because DFA simulation is really just a way to avoid
			// computing reach/closure sets. Technically, once we know that
			// we have a previously added DFA state, we could jump over to
			// the DFA simulator. But, that would mean popping back and forth
			// a lot and making things more complicated algorithmically.
			// This optimization makes a lot of sense for loops within DFA.
			// A character will take us back to an existing DFA state
			// that already has lots of edges out of it. e.g., .* in comments.
			// print("Target for:" + str(s) + " and:" + str(t))
			var target = this.getExistingTargetState(s, t);
			// print("Existing:" + str(target))
			if (target === null) {
				target = this.computeTargetState(input, s, t);
				// print("Computed:" + str(target))
			}
			if (target === ATNSimulator.ERROR) {
				break;
			}
			// If this is a consumable input element, make sure to consume before
			// capturing the accept state so the input index, line, and char
			// position accurately reflect the state of the interpreter at the
			// end of the token.
			if (t !== Token.EOF) {
				this.consume(input);
			}
			if (target.isAcceptState) {
				this.captureSimState(this.prevAccept, input, target);
				if (t === Token.EOF) {
					break;
				}
			}
			t = input.LA(1);
			s = target; // flip; current DFA target becomes new src/from state
		}
		return this.failOrAccept(this.prevAccept, input, s.configs, t);
	};

	// Get an existing target state for an edge in the DFA. If the target state
	// for the edge has not yet been computed or is otherwise not available,
	// this method returns {@code null}.
	//
	// @param s The current DFA state
	// @param t The next input symbol
	// @return The existing target DFA state for the given input symbol
	// {@code t}, or {@code null} if the target state for this edge is not
	// already cached
	LexerATNSimulator.prototype.getExistingTargetState = function (s, t) {
		if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
			return null;
		}

		var target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];
		if (target === undefined) {
			target = null;
		}
		if (LexerATNSimulator.debug && target !== null) {
			console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
		}
		return target;
	};

	// Compute a target state for an edge in the DFA, and attempt to add the
	// computed state and corresponding edge to the DFA.
	//
	// @param input The input stream
	// @param s The current DFA state
	// @param t The next input symbol
	//
	// @return The computed target DFA state for the given input symbol
	// {@code t}. If {@code t} does not lead to a valid DFA state, this method
	// returns {@link //ERROR}.
	LexerATNSimulator.prototype.computeTargetState = function (input, s, t) {
		var reach = new OrderedATNConfigSet();
		// if we don't find an existing DFA state
		// Fill reach starting from closure, following t transitions
		this.getReachableConfigSet(input, s.configs, reach, t);

		if (reach.items.length === 0) {
			// we got nowhere on t from s
			if (!reach.hasSemanticContext) {
				// we got nowhere on t, don't throw out this knowledge; it'd
				// cause a failover from DFA later.
				this.addDFAEdge(s, t, ATNSimulator.ERROR);
			}
			// stop when we can't match any more char
			return ATNSimulator.ERROR;
		}
		// Add an edge from s to target DFA found/created for reach
		return this.addDFAEdge(s, t, null, reach);
	};

	LexerATNSimulator.prototype.failOrAccept = function (prevAccept, input, reach, t) {
		if (this.prevAccept.dfaState !== null) {
			var lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
			this.accept(input, lexerActionExecutor, this.startIndex, prevAccept.index, prevAccept.line, prevAccept.column);
			return prevAccept.dfaState.prediction;
		} else {
			// if no accept and EOF is first char, return EOF
			if (t === Token.EOF && input.index === this.startIndex) {
				return Token.EOF;
			}
			throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
		}
	};

	// Given a starting configuration set, figure out all ATN configurations
	// we can reach upon input {@code t}. Parameter {@code reach} is a return
	// parameter.
	LexerATNSimulator.prototype.getReachableConfigSet = function (input, closure, reach, t) {
		// this is used to skip processing for configs which have a lower priority
		// than a config that already reached an accept state for the same rule
		var skipAlt = ATN.INVALID_ALT_NUMBER;
		for (var i = 0; i < closure.items.length; i++) {
			var cfg = closure.items[i];
			var currentAltReachedAcceptState = cfg.alt === skipAlt;
			if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
				continue;
			}
			if (LexerATNSimulator.debug) {
				console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
			}
			for (var j = 0; j < cfg.state.transitions.length; j++) {
				var trans = cfg.state.transitions[j]; // for each transition
				var target = this.getReachableTarget(trans, t);
				if (target !== null) {
					var lexerActionExecutor = cfg.lexerActionExecutor;
					if (lexerActionExecutor !== null) {
						lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
					}
					var treatEofAsEpsilon = t === Token.EOF;
					var config = new LexerATNConfig({ state: target, lexerActionExecutor: lexerActionExecutor }, cfg);
					if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
						// any remaining configs for this alt have a lower priority
						// than the one that just reached an accept state.
						skipAlt = cfg.alt;
					}
				}
			}
		}
	};

	LexerATNSimulator.prototype.accept = function (input, lexerActionExecutor, startIndex, index, line, charPos) {
		if (LexerATNSimulator.debug) {
			console.log("ACTION %s\n", lexerActionExecutor);
		}
		// seek to after last char in token
		input.seek(index);
		this.line = line;
		this.column = charPos;
		if (lexerActionExecutor !== null && this.recog !== null) {
			lexerActionExecutor.execute(this.recog, input, startIndex);
		}
	};

	LexerATNSimulator.prototype.getReachableTarget = function (trans, t) {
		if (trans.matches(t, 0, 0xFFFE)) {
			return trans.target;
		} else {
			return null;
		}
	};

	LexerATNSimulator.prototype.computeStartState = function (input, p) {
		var initialContext = PredictionContext.EMPTY;
		var configs = new OrderedATNConfigSet();
		for (var i = 0; i < p.transitions.length; i++) {
			var target = p.transitions[i].target;
			var cfg = new LexerATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
			this.closure(input, cfg, configs, false, false, false);
		}
		return configs;
	};

	// Since the alternatives within any lexer decision are ordered by
	// preference, this method stops pursuing the closure as soon as an accept
	// state is reached. After the first accept state is reached by depth-first
	// search from {@code config}, all other (potentially reachable) states for
	// this rule would have a lower priority.
	//
	// @return {@code true} if an accept state is reached, otherwise
	// {@code false}.
	LexerATNSimulator.prototype.closure = function (input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
		var cfg = null;
		if (LexerATNSimulator.debug) {
			console.log("closure(" + config.toString(this.recog, true) + ")");
		}
		if (config.state instanceof RuleStopState) {
			if (LexerATNSimulator.debug) {
				if (this.recog !== null) {
					console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
				} else {
					console.log("closure at rule stop %s\n", config);
				}
			}
			if (config.context === null || config.context.hasEmptyPath()) {
				if (config.context === null || config.context.isEmpty()) {
					configs.add(config);
					return true;
				} else {
					configs.add(new LexerATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config));
					currentAltReachedAcceptState = true;
				}
			}
			if (config.context !== null && !config.context.isEmpty()) {
				for (var i = 0; i < config.context.length; i++) {
					if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
						var newContext = config.context.getParent(i); // "pop" return state
						var returnState = this.atn.states[config.context.getReturnState(i)];
						cfg = new LexerATNConfig({ state: returnState, context: newContext }, config);
						currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
					}
				}
			}
			return currentAltReachedAcceptState;
		}
		// optimization
		if (!config.state.epsilonOnlyTransitions) {
			if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
				configs.add(config);
			}
		}
		for (var j = 0; j < config.state.transitions.length; j++) {
			var trans = config.state.transitions[j];
			cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
			if (cfg !== null) {
				currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
			}
		}
		return currentAltReachedAcceptState;
	};

	// side-effect: can alter configs.hasSemanticContext
	LexerATNSimulator.prototype.getEpsilonTarget = function (input, config, trans, configs, speculative, treatEofAsEpsilon) {
		var cfg = null;
		if (trans.serializationType === Transition.RULE) {
			var newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
			cfg = new LexerATNConfig({ state: trans.target, context: newContext }, config);
		} else if (trans.serializationType === Transition.PRECEDENCE) {
			throw "Precedence predicates are not supported in lexers.";
		} else if (trans.serializationType === Transition.PREDICATE) {
			// Track traversing semantic predicates. If we traverse,
			// we cannot add a DFA state for this "reach" computation
			// because the DFA would not test the predicate again in the
			// future. Rather than creating collections of semantic predicates
			// like v3 and testing them on prediction, v4 will test them on the
			// fly all the time using the ATN not the DFA. This is slower but
			// semantically it's not used that often. One of the key elements to
			// this predicate mechanism is not adding DFA states that see
			// predicates immediately afterwards in the ATN. For example,

			// a : ID {p1}? | ID {p2}? ;

			// should create the start state for rule 'a' (to save start state
			// competition), but should not create target of ID state. The
			// collection of ATN states the following ID references includes
			// states reached by traversing predicates. Since this is when we
			// test them, we cannot cash the DFA state target of ID.

			if (LexerATNSimulator.debug) {
				console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
			}
			configs.hasSemanticContext = true;
			if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
				cfg = new LexerATNConfig({ state: trans.target }, config);
			}
		} else if (trans.serializationType === Transition.ACTION) {
			if (config.context === null || config.context.hasEmptyPath()) {
				// execute actions anywhere in the start rule for a token.
				//
				// TODO: if the entry rule is invoked recursively, some
				// actions may be executed during the recursive call. The
				// problem can appear when hasEmptyPath() is true but
				// isEmpty() is false. In this case, the config needs to be
				// split into two contexts - one with just the empty path
				// and another with everything but the empty path.
				// Unfortunately, the current algorithm does not allow
				// getEpsilonTarget to return two configurations, so
				// additional modifications are needed before we can support
				// the split operation.
				var lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
				cfg = new LexerATNConfig({ state: trans.target, lexerActionExecutor: lexerActionExecutor }, config);
			} else {
				// ignore actions in referenced rules
				cfg = new LexerATNConfig({ state: trans.target }, config);
			}
		} else if (trans.serializationType === Transition.EPSILON) {
			cfg = new LexerATNConfig({ state: trans.target }, config);
		} else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
			if (treatEofAsEpsilon) {
				if (trans.matches(Token.EOF, 0, 0xFFFF)) {
					cfg = new LexerATNConfig({ state: trans.target }, config);
				}
			}
		}
		return cfg;
	};

	// Evaluate a predicate specified in the lexer.
	//
	// <p>If {@code speculative} is {@code true}, this method was called before
	// {@link //consume} for the matched character. This method should call
	// {@link //consume} before evaluating the predicate to ensure position
	// sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
	// and {@link Lexer//getcolumn}, properly reflect the current
	// lexer state. This method should restore {@code input} and the simulator
	// to the original state before returning (i.e. undo the actions made by the
	// call to {@link //consume}.</p>
	//
	// @param input The input stream.
	// @param ruleIndex The rule containing the predicate.
	// @param predIndex The index of the predicate within the rule.
	// @param speculative {@code true} if the current index in {@code input} is
	// one character before the predicate's location.
	//
	// @return {@code true} if the specified predicate evaluates to
	// {@code true}.
	// /
	LexerATNSimulator.prototype.evaluatePredicate = function (input, ruleIndex, predIndex, speculative) {
		// assume true if no recognizer was provided
		if (this.recog === null) {
			return true;
		}
		if (!speculative) {
			return this.recog.sempred(null, ruleIndex, predIndex);
		}
		var savedcolumn = this.column;
		var savedLine = this.line;
		var index = input.index;
		var marker = input.mark();
		try {
			this.consume(input);
			return this.recog.sempred(null, ruleIndex, predIndex);
		} finally {
			this.column = savedcolumn;
			this.line = savedLine;
			input.seek(index);
			input.release(marker);
		}
	};

	LexerATNSimulator.prototype.captureSimState = function (settings, input, dfaState) {
		settings.index = input.index;
		settings.line = this.line;
		settings.column = this.column;
		settings.dfaState = dfaState;
	};

	LexerATNSimulator.prototype.addDFAEdge = function (from_, tk, to, cfgs) {
		if (to === undefined) {
			to = null;
		}
		if (cfgs === undefined) {
			cfgs = null;
		}
		if (to === null && cfgs !== null) {
			// leading to this call, ATNConfigSet.hasSemanticContext is used as a
			// marker indicating dynamic predicate evaluation makes this edge
			// dependent on the specific input sequence, so the static edge in the
			// DFA should be omitted. The target DFAState is still created since
			// execATN has the ability to resynchronize with the DFA state cache
			// following the predicate evaluation step.
			//
			// TJP notes: next time through the DFA, we see a pred again and eval.
			// If that gets us to a previously created (but dangling) DFA
			// state, we can continue in pure DFA mode from there.
			// /
			var suppressEdge = cfgs.hasSemanticContext;
			cfgs.hasSemanticContext = false;

			to = this.addDFAState(cfgs);

			if (suppressEdge) {
				return to;
			}
		}
		// add the edge
		if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
			// Only track edges within the DFA bounds
			return to;
		}
		if (LexerATNSimulator.debug) {
			console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
		}
		if (from_.edges === null) {
			// make room for tokens 1..n and -1 masquerading as index 0
			from_.edges = [];
		}
		from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to; // connect

		return to;
	};

	// Add a new DFA state if there isn't one with this set of
	// configurations already. This method also detects the first
	// configuration containing an ATN rule stop state. Later, when
	// traversing the DFA, we will know which rule to accept.
	LexerATNSimulator.prototype.addDFAState = function (configs) {
		var proposed = new DFAState(null, configs);
		var firstConfigWithRuleStopState = null;
		for (var i = 0; i < configs.items.length; i++) {
			var cfg = configs.items[i];
			if (cfg.state instanceof RuleStopState) {
				firstConfigWithRuleStopState = cfg;
				break;
			}
		}
		if (firstConfigWithRuleStopState !== null) {
			proposed.isAcceptState = true;
			proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
			proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
		}
		var dfa = this.decisionToDFA[this.mode];
		var existing = dfa.states.get(proposed);
		if (existing !== null) {
			return existing;
		}
		var newState = proposed;
		newState.stateNumber = dfa.states.length;
		configs.setReadonly(true);
		newState.configs = configs;
		dfa.states.add(newState);
		return newState;
	};

	LexerATNSimulator.prototype.getDFA = function (mode) {
		return this.decisionToDFA[mode];
	};

	// Get the text matched so far for the current token.
	LexerATNSimulator.prototype.getText = function (input) {
		// index is first lookahead char, don't include.
		return input.getText(this.startIndex, input.index - 1);
	};

	LexerATNSimulator.prototype.consume = function (input) {
		var curChar = input.LA(1);
		if (curChar === "\n".charCodeAt(0)) {
			this.line += 1;
			this.column = 0;
		} else {
			this.column += 1;
		}
		input.consume();
	};

	LexerATNSimulator.prototype.getTokenName = function (tt) {
		if (tt === -1) {
			return "EOF";
		} else {
			return "'" + String.fromCharCode(tt) + "'";
		}
	};

	exports.LexerATNSimulator = LexerATNSimulator;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// A lexer is recognizer that draws input symbols from a character stream.
	//  lexer grammars result in a subclass of this object. A Lexer object
	//  uses simplified match() and error recovery mechanisms in the interest of speed.

	var Token = __webpack_require__(6).Token;
	var Recognizer = __webpack_require__(23).Recognizer;
	var CommonTokenFactory = __webpack_require__(25).CommonTokenFactory;
	var RecognitionException = __webpack_require__(26).RecognitionException;
	var LexerNoViableAltException = __webpack_require__(26).LexerNoViableAltException;

	function TokenSource() {
		return this;
	}

	function Lexer(input) {
		Recognizer.call(this);
		this._input = input;
		this._factory = CommonTokenFactory.DEFAULT;
		this._tokenFactorySourcePair = [this, input];

		this._interp = null; // child classes must populate this

		// The goal of all lexer rules/methods is to create a token object.
		// this is an instance variable as multiple rules may collaborate to
		// create a single token. nextToken will return this object after
		// matching lexer rule(s). If you subclass to allow multiple token
		// emissions, then set this to the last token to be matched or
		// something nonnull so that the auto token emit mechanism will not
		// emit another token.
		this._token = null;

		// What character index in the stream did the current token start at?
		// Needed, for example, to get the text for current token. Set at
		// the start of nextToken.
		this._tokenStartCharIndex = -1;

		// The line on which the first character of the token resides///
		this._tokenStartLine = -1;

		// The character position of first character within the line///
		this._tokenStartColumn = -1;

		// Once we see EOF on char stream, next token will be EOF.
		// If you have DONE : EOF ; then you see DONE EOF.
		this._hitEOF = false;

		// The channel number for the current token///
		this._channel = Token.DEFAULT_CHANNEL;

		// The token type for the current token///
		this._type = Token.INVALID_TYPE;

		this._modeStack = [];
		this._mode = Lexer.DEFAULT_MODE;

		// You can set the text for the current token to override what is in
		// the input char buffer. Use setText() or can set this instance var.
		// /
		this._text = null;

		return this;
	}

	Lexer.prototype = Object.create(Recognizer.prototype);
	Lexer.prototype.constructor = Lexer;

	Lexer.DEFAULT_MODE = 0;
	Lexer.MORE = -2;
	Lexer.SKIP = -3;

	Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
	Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
	Lexer.MIN_CHAR_VALUE = '\0';
	Lexer.MAX_CHAR_VALUE = '\uFFFE';

	Lexer.prototype.reset = function () {
		// wack Lexer state variables
		if (this._input !== null) {
			this._input.seek(0); // rewind the input
		}
		this._token = null;
		this._type = Token.INVALID_TYPE;
		this._channel = Token.DEFAULT_CHANNEL;
		this._tokenStartCharIndex = -1;
		this._tokenStartColumn = -1;
		this._tokenStartLine = -1;
		this._text = null;

		this._hitEOF = false;
		this._mode = Lexer.DEFAULT_MODE;
		this._modeStack = [];

		this._interp.reset();
	};

	// Return a token from this source; i.e., match a token on the char stream.
	Lexer.prototype.nextToken = function () {
		if (this._input === null) {
			throw "nextToken requires a non-null input stream.";
		}

		// Mark start location in char stream so unbuffered streams are
		// guaranteed at least have text of current token
		var tokenStartMarker = this._input.mark();
		try {
			while (true) {
				if (this._hitEOF) {
					this.emitEOF();
					return this._token;
				}
				this._token = null;
				this._channel = Token.DEFAULT_CHANNEL;
				this._tokenStartCharIndex = this._input.index;
				this._tokenStartColumn = this._interp.column;
				this._tokenStartLine = this._interp.line;
				this._text = null;
				var continueOuter = false;
				while (true) {
					this._type = Token.INVALID_TYPE;
					var ttype = Lexer.SKIP;
					try {
						ttype = this._interp.match(this._input, this._mode);
					} catch (e) {
						if (e instanceof RecognitionException) {
							this.notifyListeners(e); // report error
							this.recover(e);
						} else {
							console.log(e.stack);
							throw e;
						}
					}
					if (this._input.LA(1) === Token.EOF) {
						this._hitEOF = true;
					}
					if (this._type === Token.INVALID_TYPE) {
						this._type = ttype;
					}
					if (this._type === Lexer.SKIP) {
						continueOuter = true;
						break;
					}
					if (this._type !== Lexer.MORE) {
						break;
					}
				}
				if (continueOuter) {
					continue;
				}
				if (this._token === null) {
					this.emit();
				}
				return this._token;
			}
		} finally {
			// make sure we release marker after match or
			// unbuffered char stream will keep buffering
			this._input.release(tokenStartMarker);
		}
	};

	// Instruct the lexer to skip creating a token for current lexer rule
	// and look for another token. nextToken() knows to keep looking when
	// a lexer rule finishes with token set to SKIP_TOKEN. Recall that
	// if token==null at end of any token rule, it creates one for you
	// and emits it.
	// /
	Lexer.prototype.skip = function () {
		this._type = Lexer.SKIP;
	};

	Lexer.prototype.more = function () {
		this._type = Lexer.MORE;
	};

	Lexer.prototype.mode = function (m) {
		this._mode = m;
	};

	Lexer.prototype.pushMode = function (m) {
		if (this._interp.debug) {
			console.log("pushMode " + m);
		}
		this._modeStack.push(this._mode);
		this.mode(m);
	};

	Lexer.prototype.popMode = function () {
		if (this._modeStack.length === 0) {
			throw "Empty Stack";
		}
		if (this._interp.debug) {
			console.log("popMode back to " + this._modeStack.slice(0, -1));
		}
		this.mode(this._modeStack.pop());
		return this._mode;
	};

	// Set the char stream and reset the lexer
	Object.defineProperty(Lexer.prototype, "inputStream", {
		get: function get() {
			return this._input;
		},
		set: function set(input) {
			this._input = null;
			this._tokenFactorySourcePair = [this, this._input];
			this.reset();
			this._input = input;
			this._tokenFactorySourcePair = [this, this._input];
		}
	});

	Object.defineProperty(Lexer.prototype, "sourceName", {
		get: function sourceName() {
			return this._input.sourceName;
		}
	});

	// By default does not support multiple emits per nextToken invocation
	// for efficiency reasons. Subclass and override this method, nextToken,
	// and getToken (to push tokens into a list and pull from that list
	// rather than a single variable as this implementation does).
	// /
	Lexer.prototype.emitToken = function (token) {
		this._token = token;
	};

	// The standard method called to automatically emit a token at the
	// outermost lexical rule. The token object should point into the
	// char buffer start..stop. If there is a text override in 'text',
	// use that to set the token's text. Override this method to emit
	// custom Token objects or provide a new factory.
	// /
	Lexer.prototype.emit = function () {
		var t = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);
		this.emitToken(t);
		return t;
	};

	Lexer.prototype.emitEOF = function () {
		var cpos = this.column;
		var lpos = this.line;
		var eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF, null, Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, lpos, cpos);
		this.emitToken(eof);
		return eof;
	};

	Object.defineProperty(Lexer.prototype, "type", {
		get: function get() {
			return this.type;
		},
		set: function set(type) {
			this._type = type;
		}
	});

	Object.defineProperty(Lexer.prototype, "line", {
		get: function get() {
			return this._interp.line;
		},
		set: function set(line) {
			this._interp.line = line;
		}
	});

	Object.defineProperty(Lexer.prototype, "column", {
		get: function get() {
			return this._interp.column;
		},
		set: function set(column) {
			this._interp.column = column;
		}
	});

	// What is the index of the current character of lookahead?///
	Lexer.prototype.getCharIndex = function () {
		return this._input.index;
	};

	// Return the text matched so far for the current token or any text override.
	//Set the complete text of this token; it wipes any previous changes to the text.
	Object.defineProperty(Lexer.prototype, "text", {
		get: function get() {
			if (this._text !== null) {
				return this._text;
			} else {
				return this._interp.getText(this._input);
			}
		},
		set: function set(text) {
			this._text = text;
		}
	});
	// Return a list of all Token objects in input char stream.
	// Forces load of all tokens. Does not include EOF token.
	// /
	Lexer.prototype.getAllTokens = function () {
		var tokens = [];
		var t = this.nextToken();
		while (t.type !== Token.EOF) {
			tokens.push(t);
			t = this.nextToken();
		}
		return tokens;
	};

	Lexer.prototype.notifyListeners = function (e) {
		var start = this._tokenStartCharIndex;
		var stop = this._input.index;
		var text = this._input.getText(start, stop);
		var msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
		var listener = this.getErrorListenerDispatch();
		listener.syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, msg, e);
	};

	Lexer.prototype.getErrorDisplay = function (s) {
		var d = [];
		for (var i = 0; i < s.length; i++) {
			d.push(s[i]);
		}
		return d.join('');
	};

	Lexer.prototype.getErrorDisplayForChar = function (c) {
		if (c.charCodeAt(0) === Token.EOF) {
			return "<EOF>";
		} else if (c === '\n') {
			return "\\n";
		} else if (c === '\t') {
			return "\\t";
		} else if (c === '\r') {
			return "\\r";
		} else {
			return c;
		}
	};

	Lexer.prototype.getCharErrorDisplay = function (c) {
		return "'" + this.getErrorDisplayForChar(c) + "'";
	};

	// Lexers can normally match any char in it's vocabulary after matching
	// a token, so do the easy thing and just kill a character and hope
	// it all works out. You can instead use the rule invocation stack
	// to do sophisticated error recovery if you are in a fragment rule.
	// /
	Lexer.prototype.recover = function (re) {
		if (this._input.LA(1) !== Token.EOF) {
			if (re instanceof LexerNoViableAltException) {
				// skip a char and try again
				this._interp.consume(this._input);
			} else {
				// TODO: Do we lose character or line position information?
				this._input.consume();
			}
		}
	};

	exports.Lexer = Lexer;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	var Token = __webpack_require__(6).Token;
	var ConsoleErrorListener = __webpack_require__(24).ConsoleErrorListener;
	var ProxyErrorListener = __webpack_require__(24).ProxyErrorListener;

	function Recognizer() {
	    this._listeners = [ConsoleErrorListener.INSTANCE];
	    this._interp = null;
	    this._stateNumber = -1;
	    return this;
	}

	Recognizer.tokenTypeMapCache = {};
	Recognizer.ruleIndexMapCache = {};

	Recognizer.prototype.checkVersion = function (toolVersion) {
	    var runtimeVersion = "4.6";
	    if (runtimeVersion !== toolVersion) {
	        console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
	    }
	};

	Recognizer.prototype.addErrorListener = function (listener) {
	    this._listeners.push(listener);
	};

	Recognizer.prototype.removeErrorListeners = function () {
	    this._listeners = [];
	};

	Recognizer.prototype.getTokenTypeMap = function () {
	    var tokenNames = this.getTokenNames();
	    if (tokenNames === null) {
	        throw "The current recognizer does not provide a list of token names.";
	    }
	    var result = this.tokenTypeMapCache[tokenNames];
	    if (result === undefined) {
	        result = tokenNames.reduce(function (o, k, i) {
	            o[k] = i;
	        });
	        result.EOF = Token.EOF;
	        this.tokenTypeMapCache[tokenNames] = result;
	    }
	    return result;
	};

	// Get a map from rule names to rule indexes.
	//
	// <p>Used for XPath and tree pattern compilation.</p>
	//
	Recognizer.prototype.getRuleIndexMap = function () {
	    var ruleNames = this.ruleNames;
	    if (ruleNames === null) {
	        throw "The current recognizer does not provide a list of rule names.";
	    }
	    var result = this.ruleIndexMapCache[ruleNames];
	    if (result === undefined) {
	        result = ruleNames.reduce(function (o, k, i) {
	            o[k] = i;
	        });
	        this.ruleIndexMapCache[ruleNames] = result;
	    }
	    return result;
	};

	Recognizer.prototype.getTokenType = function (tokenName) {
	    var ttype = this.getTokenTypeMap()[tokenName];
	    if (ttype !== undefined) {
	        return ttype;
	    } else {
	        return Token.INVALID_TYPE;
	    }
	};

	// What is the error header, normally line/character position information?//
	Recognizer.prototype.getErrorHeader = function (e) {
	    var line = e.getOffendingToken().line;
	    var column = e.getOffendingToken().column;
	    return "line " + line + ":" + column;
	};

	// How should a token be displayed in an error message? The default
	//  is to display just the text, but during development you might
	//  want to have a lot of information spit out.  Override in that case
	//  to use t.toString() (which, for CommonToken, dumps everything about
	//  the token). This is better than forcing you to override a method in
	//  your token objects because you don't have to go modify your lexer
	//  so that it creates a new Java type.
	//
	// @deprecated This method is not called by the ANTLR 4 Runtime. Specific
	// implementations of {@link ANTLRErrorStrategy} may provide a similar
	// feature when necessary. For example, see
	// {@link DefaultErrorStrategy//getTokenErrorDisplay}.
	//
	Recognizer.prototype.getTokenErrorDisplay = function (t) {
	    if (t === null) {
	        return "<no token>";
	    }
	    var s = t.text;
	    if (s === null) {
	        if (t.type === Token.EOF) {
	            s = "<EOF>";
	        } else {
	            s = "<" + t.type + ">";
	        }
	    }
	    s = s.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
	    return "'" + s + "'";
	};

	Recognizer.prototype.getErrorListenerDispatch = function () {
	    return new ProxyErrorListener(this._listeners);
	};

	// subclass needs to override these if there are sempreds or actions
	// that the ATN interp needs to execute
	Recognizer.prototype.sempred = function (localctx, ruleIndex, actionIndex) {
	    return true;
	};

	Recognizer.prototype.precpred = function (localctx, precedence) {
	    return true;
	};

	//Indicate that the recognizer has changed internal state that is
	//consistent with the ATN state passed in.  This way we always know
	//where we are in the ATN as the parser goes along. The rule
	//context objects form a stack that lets us see the stack of
	//invoking rules. Combine this and we have complete ATN
	//configuration information.

	Object.defineProperty(Recognizer.prototype, "state", {
	    get: function get() {
	        return this._stateNumber;
	    },
	    set: function set(state) {
	        this._stateNumber = state;
	    }
	});

	exports.Recognizer = Recognizer;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	// Provides an empty default implementation of {@link ANTLRErrorListener}. The
	// default implementation of each method does nothing, but can be overridden as
	// necessary.

	function ErrorListener() {
	  return this;
	}

	ErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {};

	ErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {};

	ErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {};

	ErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {};

	function ConsoleErrorListener() {
	  ErrorListener.call(this);
	  return this;
	}

	ConsoleErrorListener.prototype = Object.create(ErrorListener.prototype);
	ConsoleErrorListener.prototype.constructor = ConsoleErrorListener;

	//
	// Provides a default instance of {@link ConsoleErrorListener}.
	//
	ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();

	//
	// {@inheritDoc}
	//
	// <p>
	// This implementation prints messages to {@link System//err} containing the
	// values of {@code line}, {@code charPositionInLine}, and {@code msg} using
	// the following format.</p>
	//
	// <pre>
	// line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
	// </pre>
	//
	ConsoleErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
	  console.error("line " + line + ":" + column + " " + msg);
	};

	function ProxyErrorListener(delegates) {
	  ErrorListener.call(this);
	  if (delegates === null) {
	    throw "delegates";
	  }
	  this.delegates = delegates;
	  return this;
	}

	ProxyErrorListener.prototype = Object.create(ErrorListener.prototype);
	ProxyErrorListener.prototype.constructor = ProxyErrorListener;

	ProxyErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
	  this.delegates.map(function (d) {
	    d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
	  });
	};

	ProxyErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
	  this.delegates.map(function (d) {
	    d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
	  });
	};

	ProxyErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
	  this.delegates.map(function (d) {
	    d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
	  });
	};

	ProxyErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
	  this.delegates.map(function (d) {
	    d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
	  });
	};

	exports.ErrorListener = ErrorListener;
	exports.ConsoleErrorListener = ConsoleErrorListener;
	exports.ProxyErrorListener = ProxyErrorListener;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	//
	// This default implementation of {@link TokenFactory} creates
	// {@link CommonToken} objects.
	//

	var CommonToken = __webpack_require__(6).CommonToken;

	function TokenFactory() {
	    return this;
	}

	function CommonTokenFactory(copyText) {
	    TokenFactory.call(this);
	    // Indicates whether {@link CommonToken//setText} should be called after
	    // constructing tokens to explicitly set the text. This is useful for cases
	    // where the input stream might not be able to provide arbitrary substrings
	    // of text from the input after the lexer creates a token (e.g. the
	    // implementation of {@link CharStream//getText} in
	    // {@link UnbufferedCharStream} throws an
	    // {@link UnsupportedOperationException}). Explicitly setting the token text
	    // allows {@link Token//getText} to be called at any time regardless of the
	    // input stream implementation.
	    //
	    // <p>
	    // The default value is {@code false} to avoid the performance and memory
	    // overhead of copying text for every token unless explicitly requested.</p>
	    //
	    this.copyText = copyText === undefined ? false : copyText;
	    return this;
	}

	CommonTokenFactory.prototype = Object.create(TokenFactory.prototype);
	CommonTokenFactory.prototype.constructor = CommonTokenFactory;

	//
	// The default {@link CommonTokenFactory} instance.
	//
	// <p>
	// This token factory does not explicitly copy token text when constructing
	// tokens.</p>
	//
	CommonTokenFactory.DEFAULT = new CommonTokenFactory();

	CommonTokenFactory.prototype.create = function (source, type, text, channel, start, stop, line, column) {
	    var t = new CommonToken(source, type, channel, start, stop);
	    t.line = line;
	    t.column = column;
	    if (text !== null) {
	        t.text = text;
	    } else if (this.copyText && source[1] !== null) {
	        t.text = source[1].getText(start, stop);
	    }
	    return t;
	};

	CommonTokenFactory.prototype.createThin = function (type, text) {
	    var t = new CommonToken(null, type);
	    t.text = text;
	    return t;
	};

	exports.CommonTokenFactory = CommonTokenFactory;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	// The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
	//  3 kinds of errors: prediction errors, failed predicate errors, and
	//  mismatched input errors. In each case, the parser knows where it is
	//  in the input, where it is in the ATN, the rule invocation stack,
	//  and what kind of problem occurred.

	var PredicateTransition = __webpack_require__(11).PredicateTransition;

	function RecognitionException(params) {
	    Error.call(this);
	    if (!!Error.captureStackTrace) {
	        Error.captureStackTrace(this, RecognitionException);
	    } else {
	        var stack = new Error().stack;
	    }
	    this.message = params.message;
	    this.recognizer = params.recognizer;
	    this.input = params.input;
	    this.ctx = params.ctx;
	    // The current {@link Token} when an error occurred. Since not all streams
	    // support accessing symbols by index, we have to track the {@link Token}
	    // instance itself.
	    this.offendingToken = null;
	    // Get the ATN state number the parser was in at the time the error
	    // occurred. For {@link NoViableAltException} and
	    // {@link LexerNoViableAltException} exceptions, this is the
	    // {@link DecisionState} number. For others, it is the state whose outgoing
	    // edge we couldn't match.
	    this.offendingState = -1;
	    if (this.recognizer !== null) {
	        this.offendingState = this.recognizer.state;
	    }
	    return this;
	}

	RecognitionException.prototype = Object.create(Error.prototype);
	RecognitionException.prototype.constructor = RecognitionException;

	// <p>If the state number is not known, this method returns -1.</p>

	//
	// Gets the set of input symbols which could potentially follow the
	// previously matched symbol at the time this exception was thrown.
	//
	// <p>If the set of expected tokens is not known and could not be computed,
	// this method returns {@code null}.</p>
	//
	// @return The set of token types that could potentially follow the current
	// state in the ATN, or {@code null} if the information is not available.
	// /
	RecognitionException.prototype.getExpectedTokens = function () {
	    if (this.recognizer !== null) {
	        return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
	    } else {
	        return null;
	    }
	};

	RecognitionException.prototype.toString = function () {
	    return this.message;
	};

	function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
	    RecognitionException.call(this, { message: "", recognizer: lexer, input: input, ctx: null });
	    this.startIndex = startIndex;
	    this.deadEndConfigs = deadEndConfigs;
	    return this;
	}

	LexerNoViableAltException.prototype = Object.create(RecognitionException.prototype);
	LexerNoViableAltException.prototype.constructor = LexerNoViableAltException;

	LexerNoViableAltException.prototype.toString = function () {
	    var symbol = "";
	    if (this.startIndex >= 0 && this.startIndex < this.input.size) {
	        symbol = this.input.getText((this.startIndex, this.startIndex));
	    }
	    return "LexerNoViableAltException" + symbol;
	};

	// Indicates that the parser could not decide which of two or more paths
	// to take based upon the remaining input. It tracks the starting token
	// of the offending input and also knows where the parser was
	// in the various paths when the error. Reported by reportNoViableAlternative()
	//
	function NoViableAltException(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
	    ctx = ctx || recognizer._ctx;
	    offendingToken = offendingToken || recognizer.getCurrentToken();
	    startToken = startToken || recognizer.getCurrentToken();
	    input = input || recognizer.getInputStream();
	    RecognitionException.call(this, { message: "", recognizer: recognizer, input: input, ctx: ctx });
	    // Which configurations did we try at input.index() that couldn't match
	    // input.LT(1)?//
	    this.deadEndConfigs = deadEndConfigs;
	    // The token object at the start index; the input stream might
	    // not be buffering tokens so get a reference to it. (At the
	    // time the error occurred, of course the stream needs to keep a
	    // buffer all of the tokens but later we might not have access to those.)
	    this.startToken = startToken;
	    this.offendingToken = offendingToken;
	}

	NoViableAltException.prototype = Object.create(RecognitionException.prototype);
	NoViableAltException.prototype.constructor = NoViableAltException;

	// This signifies any kind of mismatched input exceptions such as
	// when the current input does not match the expected token.
	//
	function InputMismatchException(recognizer) {
	    RecognitionException.call(this, { message: "", recognizer: recognizer, input: recognizer.getInputStream(), ctx: recognizer._ctx });
	    this.offendingToken = recognizer.getCurrentToken();
	}

	InputMismatchException.prototype = Object.create(RecognitionException.prototype);
	InputMismatchException.prototype.constructor = InputMismatchException;

	// A semantic predicate failed during validation. Validation of predicates
	// occurs when normally parsing the alternative just like matching a token.
	// Disambiguating predicate evaluation occurs when we test a predicate during
	// prediction.

	function FailedPredicateException(recognizer, predicate, message) {
	    RecognitionException.call(this, { message: this.formatMessage(predicate, message || null), recognizer: recognizer,
	        input: recognizer.getInputStream(), ctx: recognizer._ctx });
	    var s = recognizer._interp.atn.states[recognizer.state];
	    var trans = s.transitions[0];
	    if (trans instanceof PredicateTransition) {
	        this.ruleIndex = trans.ruleIndex;
	        this.predicateIndex = trans.predIndex;
	    } else {
	        this.ruleIndex = 0;
	        this.predicateIndex = 0;
	    }
	    this.predicate = predicate;
	    this.offendingToken = recognizer.getCurrentToken();
	    return this;
	}

	FailedPredicateException.prototype = Object.create(RecognitionException.prototype);
	FailedPredicateException.prototype.constructor = FailedPredicateException;

	FailedPredicateException.prototype.formatMessage = function (predicate, message) {
	    if (message !== null) {
	        return message;
	    } else {
	        return "failed predicate: {" + predicate + "}?";
	    }
	};

	function ParseCancellationException() {
	    Error.call(this);
	    Error.captureStackTrace(this, ParseCancellationException);
	    return this;
	}

	ParseCancellationException.prototype = Object.create(Error.prototype);
	ParseCancellationException.prototype.constructor = ParseCancellationException;

	exports.RecognitionException = RecognitionException;
	exports.NoViableAltException = NoViableAltException;
	exports.LexerNoViableAltException = LexerNoViableAltException;
	exports.InputMismatchException = InputMismatchException;
	exports.FailedPredicateException = FailedPredicateException;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	var DFAState = __webpack_require__(28).DFAState;
	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var getCachedPredictionContext = __webpack_require__(12).getCachedPredictionContext;

	function ATNSimulator(atn, sharedContextCache) {

	    // The context cache maps all PredictionContext objects that are ==
	    //  to a single cached copy. This cache is shared across all contexts
	    //  in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
	    //  to use only cached nodes/graphs in addDFAState(). We don't want to
	    //  fill this during closure() since there are lots of contexts that
	    //  pop up but are not used ever again. It also greatly slows down closure().
	    //
	    //  <p>This cache makes a huge difference in memory and a little bit in speed.
	    //  For the Java grammar on java.*, it dropped the memory requirements
	    //  at the end from 25M to 16M. We don't store any of the full context
	    //  graphs in the DFA because they are limited to local context only,
	    //  but apparently there's a lot of repetition there as well. We optimize
	    //  the config contexts before storing the config set in the DFA states
	    //  by literally rebuilding them with cached subgraphs only.</p>
	    //
	    //  <p>I tried a cache for use during closure operations, that was
	    //  whacked after each adaptivePredict(). It cost a little bit
	    //  more time I think and doesn't save on the overall footprint
	    //  so it's not worth the complexity.</p>
	    ///
	    this.atn = atn;
	    this.sharedContextCache = sharedContextCache;
	    return this;
	}

	// Must distinguish between missing edge and edge we know leads nowhere///
	ATNSimulator.ERROR = new DFAState(0x7FFFFFFF, new ATNConfigSet());

	ATNSimulator.prototype.getCachedContext = function (context) {
	    if (this.sharedContextCache === null) {
	        return context;
	    }
	    var visited = {};
	    return getCachedPredictionContext(context, this.sharedContextCache, visited);
	};

	exports.ATNSimulator = ATNSimulator;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var Utils = __webpack_require__(5);
	var Hash = Utils.Hash;
	var Set = Utils.Set;

	// Map a predicate to a predicted alternative.///

	function PredPrediction(pred, alt) {
		this.alt = alt;
		this.pred = pred;
		return this;
	}

	PredPrediction.prototype.toString = function () {
		return "(" + this.pred + ", " + this.alt + ")";
	};

	// A DFA state represents a set of possible ATN configurations.
	// As Aho, Sethi, Ullman p. 117 says "The DFA uses its state
	// to keep track of all possible states the ATN can be in after
	// reading each input symbol. That is to say, after reading
	// input a1a2..an, the DFA is in a state that represents the
	// subset T of the states of the ATN that are reachable from the
	// ATN's start state along some path labeled a1a2..an."
	// In conventional NFA&rarr;DFA conversion, therefore, the subset T
	// would be a bitset representing the set of states the
	// ATN could be in. We need to track the alt predicted by each
	// state as well, however. More importantly, we need to maintain
	// a stack of states, tracking the closure operations as they
	// jump from rule to rule, emulating rule invocations (method calls).
	// I have to add a stack to simulate the proper lookahead sequences for
	// the underlying LL grammar from which the ATN was derived.
	//
	// <p>I use a set of ATNConfig objects not simple states. An ATNConfig
	// is both a state (ala normal conversion) and a RuleContext describing
	// the chain of rules (if any) followed to arrive at that state.</p>
	//
	// <p>A DFA state may have multiple references to a particular state,
	// but with different ATN contexts (with same or different alts)
	// meaning that state was reached via a different set of rule invocations.</p>
	// /

	function DFAState(stateNumber, configs) {
		if (stateNumber === null) {
			stateNumber = -1;
		}
		if (configs === null) {
			configs = new ATNConfigSet();
		}
		this.stateNumber = stateNumber;
		this.configs = configs;
		// {@code edges[symbol]} points to target of symbol. Shift up by 1 so (-1)
		// {@link Token//EOF} maps to {@code edges[0]}.
		this.edges = null;
		this.isAcceptState = false;
		// if accept state, what ttype do we match or alt do we predict?
		// This is set to {@link ATN//INVALID_ALT_NUMBER} when {@link
		// //predicates}{@code !=null} or
		// {@link //requiresFullContext}.
		this.prediction = 0;
		this.lexerActionExecutor = null;
		// Indicates that this state was created during SLL prediction that
		// discovered a conflict between the configurations in the state. Future
		// {@link ParserATNSimulator//execATN} invocations immediately jumped doing
		// full context prediction if this field is true.
		this.requiresFullContext = false;
		// During SLL parsing, this is a list of predicates associated with the
		// ATN configurations of the DFA state. When we have predicates,
		// {@link //requiresFullContext} is {@code false} since full context
		// prediction evaluates predicates
		// on-the-fly. If this is not null, then {@link //prediction} is
		// {@link ATN//INVALID_ALT_NUMBER}.
		//
		// <p>We only use these for non-{@link //requiresFullContext} but
		// conflicting states. That
		// means we know from the context (it's $ or we don't dip into outer
		// context) that it's an ambiguity not a conflict.</p>
		//
		// <p>This list is computed by {@link
		// ParserATNSimulator//predicateDFAState}.</p>
		this.predicates = null;
		return this;
	}

	// Get the set of all alts mentioned by all ATN configurations in this
	// DFA state.
	DFAState.prototype.getAltSet = function () {
		var alts = new Set();
		if (this.configs !== null) {
			for (var i = 0; i < this.configs.length; i++) {
				var c = this.configs[i];
				alts.add(c.alt);
			}
		}
		if (alts.length === 0) {
			return null;
		} else {
			return alts;
		}
	};

	// Two {@link DFAState} instances are equal if their ATN configuration sets
	// are the same. This method is used to see if a state already exists.
	//
	// <p>Because the number of alternatives and number of ATN configurations are
	// finite, there is a finite number of DFA states that can be processed.
	// This is necessary to show that the algorithm terminates.</p>
	//
	// <p>Cannot test the DFA state numbers here because in
	// {@link ParserATNSimulator//addDFAState} we need to know if any other state
	// exists that has this exact set of ATN configurations. The
	// {@link //stateNumber} is irrelevant.</p>
	DFAState.prototype.equals = function (other) {
		// compare set of ATN configurations in this set with other
		return this === other || other instanceof DFAState && this.configs.equals(other.configs);
	};

	DFAState.prototype.toString = function () {
		var s = "" + this.stateNumber + ":" + this.configs;
		if (this.isAcceptState) {
			s = s + "=>";
			if (this.predicates !== null) s = s + this.predicates;else s = s + this.prediction;
		}
		return s;
	};

	DFAState.prototype.hashCode = function () {
		var hash = new Hash();
		hash.update(this.configs);
		if (this.isAcceptState) {
			if (this.predicates !== null) hash.update(this.predicates);else hash.update(this.prediction);
		}
		return hash.finish();
	};

	exports.DFAState = DFAState;
	exports.PredPrediction = PredPrediction;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	//
	// Specialized {@link Set}{@code <}{@link ATNConfig}{@code >} that can track
	// info about the set, with support for combining similar configurations using a
	// graph-structured stack.
	///

	var ATN = __webpack_require__(3).ATN;
	var Utils = __webpack_require__(5);
	var Hash = Utils.Hash;
	var Set = Utils.Set;
	var SemanticContext = __webpack_require__(9).SemanticContext;
	var merge = __webpack_require__(12).merge;

	function hashATNConfig(c) {
		return c.hashCodeForConfigSet();
	}

	function equalATNConfigs(a, b) {
		if (a === b) {
			return true;
		} else if (a === null || b === null) {
			return false;
		} else return a.equalsForConfigSet(b);
	}

	function ATNConfigSet(fullCtx) {
		//
		// The reason that we need this is because we don't want the hash map to use
		// the standard hash code and equals. We need all configurations with the
		// same
		// {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
		// doubles
		// the number of objects associated with ATNConfigs. The other solution is
		// to
		// use a hash table that lets us specify the equals/hashcode operation.
		// All configs but hashed by (s, i, _, pi) not including context. Wiped out
		// when we go readonly as this set becomes a DFA state.
		this.configLookup = new Set(hashATNConfig, equalATNConfigs);
		// Indicates that this configuration set is part of a full context
		// LL prediction. It will be used to determine how to merge $. With SLL
		// it's a wildcard whereas it is not for LL context merge.
		this.fullCtx = fullCtx === undefined ? true : fullCtx;
		// Indicates that the set of configurations is read-only. Do not
		// allow any code to manipulate the set; DFA states will point at
		// the sets and they must not change. This does not protect the other
		// fields; in particular, conflictingAlts is set after
		// we've made this readonly.
		this.readOnly = false;
		// Track the elements as they are added to the set; supports get(i)///
		this.configs = [];

		// TODO: these fields make me pretty uncomfortable but nice to pack up info
		// together, saves recomputation
		// TODO: can we track conflicts as they are added to save scanning configs
		// later?
		this.uniqueAlt = 0;
		this.conflictingAlts = null;

		// Used in parser and lexer. In lexer, it indicates we hit a pred
		// while computing a closure operation. Don't make a DFA state from this.
		this.hasSemanticContext = false;
		this.dipsIntoOuterContext = false;

		this.cachedHashCode = -1;

		return this;
	}

	// Adding a new config means merging contexts with existing configs for
	// {@code (s, i, pi, _)}, where {@code s} is the
	// {@link ATNConfig//state}, {@code i} is the {@link ATNConfig//alt}, and
	// {@code pi} is the {@link ATNConfig//semanticContext}. We use
	// {@code (s,i,pi)} as key.
	//
	// <p>This method updates {@link //dipsIntoOuterContext} and
	// {@link //hasSemanticContext} when necessary.</p>
	// /
	ATNConfigSet.prototype.add = function (config, mergeCache) {
		if (mergeCache === undefined) {
			mergeCache = null;
		}
		if (this.readOnly) {
			throw "This set is readonly";
		}
		if (config.semanticContext !== SemanticContext.NONE) {
			this.hasSemanticContext = true;
		}
		if (config.reachesIntoOuterContext > 0) {
			this.dipsIntoOuterContext = true;
		}
		var existing = this.configLookup.add(config);
		if (existing === config) {
			this.cachedHashCode = -1;
			this.configs.push(config); // track order here
			return true;
		}
		// a previous (s,i,pi,_), merge with it and save result
		var rootIsWildcard = !this.fullCtx;
		var merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
		// no need to check for existing.context, config.context in cache
		// since only way to create new graphs is "call rule" and here. We
		// cache at both places.
		existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext);
		// make sure to preserve the precedence filter suppression during the merge
		if (config.precedenceFilterSuppressed) {
			existing.precedenceFilterSuppressed = true;
		}
		existing.context = merged; // replace context; no need to alt mapping
		return true;
	};

	ATNConfigSet.prototype.getStates = function () {
		var states = new Set();
		for (var i = 0; i < this.configs.length; i++) {
			states.add(this.configs[i].state);
		}
		return states;
	};

	ATNConfigSet.prototype.getPredicates = function () {
		var preds = [];
		for (var i = 0; i < this.configs.length; i++) {
			var c = this.configs[i].semanticContext;
			if (c !== SemanticContext.NONE) {
				preds.push(c.semanticContext);
			}
		}
		return preds;
	};

	Object.defineProperty(ATNConfigSet.prototype, "items", {
		get: function get() {
			return this.configs;
		}
	});

	ATNConfigSet.prototype.optimizeConfigs = function (interpreter) {
		if (this.readOnly) {
			throw "This set is readonly";
		}
		if (this.configLookup.length === 0) {
			return;
		}
		for (var i = 0; i < this.configs.length; i++) {
			var config = this.configs[i];
			config.context = interpreter.getCachedContext(config.context);
		}
	};

	ATNConfigSet.prototype.addAll = function (coll) {
		for (var i = 0; i < coll.length; i++) {
			this.add(coll[i]);
		}
		return false;
	};

	ATNConfigSet.prototype.equals = function (other) {
		return this === other || other instanceof ATNConfigSet && Utils.equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
	};

	ATNConfigSet.prototype.hashCode = function () {
		var hash = new Hash();
		this.updateHashCode(hash);
		return hash.finish();
	};

	ATNConfigSet.prototype.updateHashCode = function (hash) {
		if (this.readOnly) {
			if (this.cachedHashCode === -1) {
				var hash = new Hash();
				hash.update(this.configs);
				this.cachedHashCode = hash.finish();
			}
			hash.update(this.cachedHashCode);
		} else {
			hash.update(this.configs);
		}
	};

	Object.defineProperty(ATNConfigSet.prototype, "length", {
		get: function get() {
			return this.configs.length;
		}
	});

	ATNConfigSet.prototype.isEmpty = function () {
		return this.configs.length === 0;
	};

	ATNConfigSet.prototype.contains = function (item) {
		if (this.configLookup === null) {
			throw "This method is not implemented for readonly sets.";
		}
		return this.configLookup.contains(item);
	};

	ATNConfigSet.prototype.containsFast = function (item) {
		if (this.configLookup === null) {
			throw "This method is not implemented for readonly sets.";
		}
		return this.configLookup.containsFast(item);
	};

	ATNConfigSet.prototype.clear = function () {
		if (this.readOnly) {
			throw "This set is readonly";
		}
		this.configs = [];
		this.cachedHashCode = -1;
		this.configLookup = new Set();
	};

	ATNConfigSet.prototype.setReadonly = function (readOnly) {
		this.readOnly = readOnly;
		if (readOnly) {
			this.configLookup = null; // can't mod, no need for lookup cache
		}
	};

	ATNConfigSet.prototype.toString = function () {
		return Utils.arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
	};

	function OrderedATNConfigSet() {
		ATNConfigSet.call(this);
		this.configLookup = new Set();
		return this;
	}

	OrderedATNConfigSet.prototype = Object.create(ATNConfigSet.prototype);
	OrderedATNConfigSet.prototype.constructor = OrderedATNConfigSet;

	exports.ATNConfigSet = ATNConfigSet;
	exports.OrderedATNConfigSet = OrderedATNConfigSet;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	// Represents an executor for a sequence of lexer actions which traversed during
	// the matching operation of a lexer rule (token).
	//
	// <p>The executor tracks position information for position-dependent lexer actions
	// efficiently, ensuring that actions appearing only at the end of the rule do
	// not cause bloating of the {@link DFA} created for the lexer.</p>

	var hashStuff = __webpack_require__(5).hashStuff;
	var LexerIndexedCustomAction = __webpack_require__(20).LexerIndexedCustomAction;

	function LexerActionExecutor(lexerActions) {
		this.lexerActions = lexerActions === null ? [] : lexerActions;
		// Caches the result of {@link //hashCode} since the hash code is an element
		// of the performance-critical {@link LexerATNConfig//hashCode} operation.
		this.cachedHashCode = hashStuff(lexerActions); // "".join([str(la) for la in
		// lexerActions]))
		return this;
	}

	// Creates a {@link LexerActionExecutor} which executes the actions for
	// the input {@code lexerActionExecutor} followed by a specified
	// {@code lexerAction}.
	//
	// @param lexerActionExecutor The executor for actions already traversed by
	// the lexer while matching a token within a particular
	// {@link LexerATNConfig}. If this is {@code null}, the method behaves as
	// though it were an empty executor.
	// @param lexerAction The lexer action to execute after the actions
	// specified in {@code lexerActionExecutor}.
	//
	// @return A {@link LexerActionExecutor} for executing the combine actions
	// of {@code lexerActionExecutor} and {@code lexerAction}.
	LexerActionExecutor.append = function (lexerActionExecutor, lexerAction) {
		if (lexerActionExecutor === null) {
			return new LexerActionExecutor([lexerAction]);
		}
		var lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
		return new LexerActionExecutor(lexerActions);
	};

	// Creates a {@link LexerActionExecutor} which encodes the current offset
	// for position-dependent lexer actions.
	//
	// <p>Normally, when the executor encounters lexer actions where
	// {@link LexerAction//isPositionDependent} returns {@code true}, it calls
	// {@link IntStream//seek} on the input {@link CharStream} to set the input
	// position to the <em>end</em> of the current token. This behavior provides
	// for efficient DFA representation of lexer actions which appear at the end
	// of a lexer rule, even when the lexer rule matches a variable number of
	// characters.</p>
	//
	// <p>Prior to traversing a match transition in the ATN, the current offset
	// from the token start index is assigned to all position-dependent lexer
	// actions which have not already been assigned a fixed offset. By storing
	// the offsets relative to the token start index, the DFA representation of
	// lexer actions which appear in the middle of tokens remains efficient due
	// to sharing among tokens of the same length, regardless of their absolute
	// position in the input stream.</p>
	//
	// <p>If the current executor already has offsets assigned to all
	// position-dependent lexer actions, the method returns {@code this}.</p>
	//
	// @param offset The current offset to assign to all position-dependent
	// lexer actions which do not already have offsets assigned.
	//
	// @return A {@link LexerActionExecutor} which stores input stream offsets
	// for all position-dependent lexer actions.
	// /
	LexerActionExecutor.prototype.fixOffsetBeforeMatch = function (offset) {
		var updatedLexerActions = null;
		for (var i = 0; i < this.lexerActions.length; i++) {
			if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
				if (updatedLexerActions === null) {
					updatedLexerActions = this.lexerActions.concat([]);
				}
				updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
			}
		}
		if (updatedLexerActions === null) {
			return this;
		} else {
			return new LexerActionExecutor(updatedLexerActions);
		}
	};

	// Execute the actions encapsulated by this executor within the context of a
	// particular {@link Lexer}.
	//
	// <p>This method calls {@link IntStream//seek} to set the position of the
	// {@code input} {@link CharStream} prior to calling
	// {@link LexerAction//execute} on a position-dependent action. Before the
	// method returns, the input position will be restored to the same position
	// it was in when the method was invoked.</p>
	//
	// @param lexer The lexer instance.
	// @param input The input stream which is the source for the current token.
	// When this method is called, the current {@link IntStream//index} for
	// {@code input} should be the start of the following token, i.e. 1
	// character past the end of the current token.
	// @param startIndex The token start index. This value may be passed to
	// {@link IntStream//seek} to set the {@code input} position to the beginning
	// of the token.
	// /
	LexerActionExecutor.prototype.execute = function (lexer, input, startIndex) {
		var requiresSeek = false;
		var stopIndex = input.index;
		try {
			for (var i = 0; i < this.lexerActions.length; i++) {
				var lexerAction = this.lexerActions[i];
				if (lexerAction instanceof LexerIndexedCustomAction) {
					var offset = lexerAction.offset;
					input.seek(startIndex + offset);
					lexerAction = lexerAction.action;
					requiresSeek = startIndex + offset !== stopIndex;
				} else if (lexerAction.isPositionDependent) {
					input.seek(stopIndex);
					requiresSeek = false;
				}
				lexerAction.execute(lexer);
			}
		} finally {
			if (requiresSeek) {
				input.seek(stopIndex);
			}
		}
	};

	LexerActionExecutor.prototype.hashCode = function () {
		return this.cachedHashCode;
	};

	LexerActionExecutor.prototype.updateHashCode = function (hash) {
		hash.update(this.cachedHashCode);
	};

	LexerActionExecutor.prototype.equals = function (other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof LexerActionExecutor)) {
			return false;
		} else if (this.cachedHashCode != other.cachedHashCode) {
			return false;
		} else if (this.lexerActions.length != other.lexerActions.length) {
			return false;
		} else {
			var numActions = this.lexerActions.length;
			for (var idx = 0; idx < numActions; ++idx) {
				if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
					return false;
				}
			}
			return true;
		}
	};

	exports.LexerActionExecutor = LexerActionExecutor;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	//
	// The embodiment of the adaptive LL(*), ALL(*), parsing strategy.
	//
	// <p>
	// The basic complexity of the adaptive strategy makes it harder to understand.
	// We begin with ATN simulation to build paths in a DFA. Subsequent prediction
	// requests go through the DFA first. If they reach a state without an edge for
	// the current symbol, the algorithm fails over to the ATN simulation to
	// complete the DFA path for the current input (until it finds a conflict state
	// or uniquely predicting state).</p>
	//
	// <p>
	// All of that is done without using the outer context because we want to create
	// a DFA that is not dependent upon the rule invocation stack when we do a
	// prediction. One DFA works in all contexts. We avoid using context not
	// necessarily because it's slower, although it can be, but because of the DFA
	// caching problem. The closure routine only considers the rule invocation stack
	// created during prediction beginning in the decision rule. For example, if
	// prediction occurs without invoking another rule's ATN, there are no context
	// stacks in the configurations. When lack of context leads to a conflict, we
	// don't know if it's an ambiguity or a weakness in the strong LL(*) parsing
	// strategy (versus full LL(*)).</p>
	//
	// <p>
	// When SLL yields a configuration set with conflict, we rewind the input and
	// retry the ATN simulation, this time using full outer context without adding
	// to the DFA. Configuration context stacks will be the full invocation stacks
	// from the start rule. If we get a conflict using full context, then we can
	// definitively say we have a true ambiguity for that input sequence. If we
	// don't get a conflict, it implies that the decision is sensitive to the outer
	// context. (It is not context-sensitive in the sense of context-sensitive
	// grammars.)</p>
	//
	// <p>
	// The next time we reach this DFA state with an SLL conflict, through DFA
	// simulation, we will again retry the ATN simulation using full context mode.
	// This is slow because we can't save the results and have to "interpret" the
	// ATN each time we get that input.</p>
	//
	// <p>
	// <strong>CACHING FULL CONTEXT PREDICTIONS</strong></p>
	//
	// <p>
	// We could cache results from full context to predicted alternative easily and
	// that saves a lot of time but doesn't work in presence of predicates. The set
	// of visible predicates from the ATN start state changes depending on the
	// context, because closure can fall off the end of a rule. I tried to cache
	// tuples (stack context, semantic context, predicted alt) but it was slower
	// than interpreting and much more complicated. Also required a huge amount of
	// memory. The goal is not to create the world's fastest parser anyway. I'd like
	// to keep this algorithm simple. By launching multiple threads, we can improve
	// the speed of parsing across a large number of files.</p>
	//
	// <p>
	// There is no strict ordering between the amount of input used by SLL vs LL,
	// which makes it really hard to build a cache for full context. Let's say that
	// we have input A B C that leads to an SLL conflict with full context X. That
	// implies that using X we might only use A B but we could also use A B C D to
	// resolve conflict. Input A B C D could predict alternative 1 in one position
	// in the input and A B C E could predict alternative 2 in another position in
	// input. The conflicting SLL configurations could still be non-unique in the
	// full context prediction, which would lead us to requiring more input than the
	// original A B C.	To make a	prediction cache work, we have to track	the exact
	// input	used during the previous prediction. That amounts to a cache that maps
	// X to a specific DFA for that context.</p>
	//
	// <p>
	// Something should be done for left-recursive expression predictions. They are
	// likely LL(1) + pred eval. Easier to do the whole SLL unless error and retry
	// with full LL thing Sam does.</p>
	//
	// <p>
	// <strong>AVOIDING FULL CONTEXT PREDICTION</strong></p>
	//
	// <p>
	// We avoid doing full context retry when the outer context is empty, we did not
	// dip into the outer context by falling off the end of the decision state rule,
	// or when we force SLL mode.</p>
	//
	// <p>
	// As an example of the not dip into outer context case, consider as super
	// constructor calls versus function calls. One grammar might look like
	// this:</p>
	//
	// <pre>
	// ctorBody
	//   : '{' superCall? stat* '}'
	//   ;
	// </pre>
	//
	// <p>
	// Or, you might see something like</p>
	//
	// <pre>
	// stat
	//   : superCall ';'
	//   | expression ';'
	//   | ...
	//   ;
	// </pre>
	//
	// <p>
	// In both cases I believe that no closure operations will dip into the outer
	// context. In the first case ctorBody in the worst case will stop at the '}'.
	// In the 2nd case it should stop at the ';'. Both cases should stay within the
	// entry rule and not dip into the outer context.</p>
	//
	// <p>
	// <strong>PREDICATES</strong></p>
	//
	// <p>
	// Predicates are always evaluated if present in either SLL or LL both. SLL and
	// LL simulation deals with predicates differently. SLL collects predicates as
	// it performs closure operations like ANTLR v3 did. It delays predicate
	// evaluation until it reaches and accept state. This allows us to cache the SLL
	// ATN simulation whereas, if we had evaluated predicates on-the-fly during
	// closure, the DFA state configuration sets would be different and we couldn't
	// build up a suitable DFA.</p>
	//
	// <p>
	// When building a DFA accept state during ATN simulation, we evaluate any
	// predicates and return the sole semantically valid alternative. If there is
	// more than 1 alternative, we report an ambiguity. If there are 0 alternatives,
	// we throw an exception. Alternatives without predicates act like they have
	// true predicates. The simple way to think about it is to strip away all
	// alternatives with false predicates and choose the minimum alternative that
	// remains.</p>
	//
	// <p>
	// When we start in the DFA and reach an accept state that's predicated, we test
	// those and return the minimum semantically viable alternative. If no
	// alternatives are viable, we throw an exception.</p>
	//
	// <p>
	// During full LL ATN simulation, closure always evaluates predicates and
	// on-the-fly. This is crucial to reducing the configuration set size during
	// closure. It hits a landmine when parsing with the Java grammar, for example,
	// without this on-the-fly evaluation.</p>
	//
	// <p>
	// <strong>SHARING DFA</strong></p>
	//
	// <p>
	// All instances of the same parser share the same decision DFAs through a
	// static field. Each instance gets its own ATN simulator but they share the
	// same {@link //decisionToDFA} field. They also share a
	// {@link PredictionContextCache} object that makes sure that all
	// {@link PredictionContext} objects are shared among the DFA states. This makes
	// a big size difference.</p>
	//
	// <p>
	// <strong>THREAD SAFETY</strong></p>
	//
	// <p>
	// The {@link ParserATNSimulator} locks on the {@link //decisionToDFA} field when
	// it adds a new DFA object to that array. {@link //addDFAEdge}
	// locks on the DFA for the current decision when setting the
	// {@link DFAState//edges} field. {@link //addDFAState} locks on
	// the DFA for the current decision when looking up a DFA state to see if it
	// already exists. We must make sure that all requests to add DFA states that
	// are equivalent result in the same shared DFA object. This is because lots of
	// threads will be trying to update the DFA at once. The
	// {@link //addDFAState} method also locks inside the DFA lock
	// but this time on the shared context cache when it rebuilds the
	// configurations' {@link PredictionContext} objects using cached
	// subgraphs/nodes. No other locking occurs, even during DFA simulation. This is
	// safe as long as we can guarantee that all threads referencing
	// {@code s.edge[t]} get the same physical target {@link DFAState}, or
	// {@code null}. Once into the DFA, the DFA simulation does not reference the
	// {@link DFA//states} map. It follows the {@link DFAState//edges} field to new
	// targets. The DFA simulator will either find {@link DFAState//edges} to be
	// {@code null}, to be non-{@code null} and {@code dfa.edges[t]} null, or
	// {@code dfa.edges[t]} to be non-null. The
	// {@link //addDFAEdge} method could be racing to set the field
	// but in either case the DFA simulator works; if {@code null}, and requests ATN
	// simulation. It could also race trying to get {@code dfa.edges[t]}, but either
	// way it will work because it's not doing a test and set operation.</p>
	//
	// <p>
	// <strong>Starting with SLL then failing to combined SLL/LL (Two-Stage
	// Parsing)</strong></p>
	//
	// <p>
	// Sam pointed out that if SLL does not give a syntax error, then there is no
	// point in doing full LL, which is slower. We only have to try LL if we get a
	// syntax error. For maximum speed, Sam starts the parser set to pure SLL
	// mode with the {@link BailErrorStrategy}:</p>
	//
	// <pre>
	// parser.{@link Parser//getInterpreter() getInterpreter()}.{@link //setPredictionMode setPredictionMode}{@code (}{@link PredictionMode//SLL}{@code )};
	// parser.{@link Parser//setErrorHandler setErrorHandler}(new {@link BailErrorStrategy}());
	// </pre>
	//
	// <p>
	// If it does not get a syntax error, then we're done. If it does get a syntax
	// error, we need to retry with the combined SLL/LL strategy.</p>
	//
	// <p>
	// The reason this works is as follows. If there are no SLL conflicts, then the
	// grammar is SLL (at least for that input set). If there is an SLL conflict,
	// the full LL analysis must yield a set of viable alternatives which is a
	// subset of the alternatives reported by SLL. If the LL set is a singleton,
	// then the grammar is LL but not SLL. If the LL set is the same size as the SLL
	// set, the decision is SLL. If the LL set has size &gt; 1, then that decision
	// is truly ambiguous on the current input. If the LL set is smaller, then the
	// SLL conflict resolution might choose an alternative that the full LL would
	// rule out as a possibility based upon better context information. If that's
	// the case, then the SLL parse will definitely get an error because the full LL
	// analysis says it's not viable. If SLL conflict resolution chooses an
	// alternative within the LL set, them both SLL and LL would choose the same
	// alternative because they both choose the minimum of multiple conflicting
	// alternatives.</p>
	//
	// <p>
	// Let's say we have a set of SLL conflicting alternatives {@code {1, 2, 3}} and
	// a smaller LL set called <em>s</em>. If <em>s</em> is {@code {2, 3}}, then SLL
	// parsing will get an error because SLL will pursue alternative 1. If
	// <em>s</em> is {@code {1, 2}} or {@code {1, 3}} then both SLL and LL will
	// choose the same alternative because alternative one is the minimum of either
	// set. If <em>s</em> is {@code {2}} or {@code {3}} then SLL will get a syntax
	// error. If <em>s</em> is {@code {1}} then SLL will succeed.</p>
	//
	// <p>
	// Of course, if the input is invalid, then we will get an error for sure in
	// both SLL and LL parsing. Erroneous input will therefore require 2 passes over
	// the input.</p>
	//

	var Utils = __webpack_require__(5);
	var Set = Utils.Set;
	var BitSet = Utils.BitSet;
	var DoubleDict = Utils.DoubleDict;
	var ATN = __webpack_require__(3).ATN;
	var ATNState = __webpack_require__(8).ATNState;
	var ATNConfig = __webpack_require__(7).ATNConfig;
	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var Token = __webpack_require__(6).Token;
	var DFAState = __webpack_require__(28).DFAState;
	var PredPrediction = __webpack_require__(28).PredPrediction;
	var ATNSimulator = __webpack_require__(27).ATNSimulator;
	var PredictionMode = __webpack_require__(32).PredictionMode;
	var RuleContext = __webpack_require__(13).RuleContext;
	var ParserRuleContext = __webpack_require__(16).ParserRuleContext;
	var SemanticContext = __webpack_require__(9).SemanticContext;
	var StarLoopEntryState = __webpack_require__(8).StarLoopEntryState;
	var RuleStopState = __webpack_require__(8).RuleStopState;
	var PredictionContext = __webpack_require__(12).PredictionContext;
	var Interval = __webpack_require__(10).Interval;
	var Transitions = __webpack_require__(11);
	var Transition = Transitions.Transition;
	var SetTransition = Transitions.SetTransition;
	var NotSetTransition = Transitions.NotSetTransition;
	var RuleTransition = Transitions.RuleTransition;
	var ActionTransition = Transitions.ActionTransition;
	var NoViableAltException = __webpack_require__(26).NoViableAltException;

	var SingletonPredictionContext = __webpack_require__(12).SingletonPredictionContext;
	var predictionContextFromRuleContext = __webpack_require__(12).predictionContextFromRuleContext;

	function ParserATNSimulator(parser, atn, decisionToDFA, sharedContextCache) {
	    ATNSimulator.call(this, atn, sharedContextCache);
	    this.parser = parser;
	    this.decisionToDFA = decisionToDFA;
	    // SLL, LL, or LL + exact ambig detection?//
	    this.predictionMode = PredictionMode.LL;
	    // LAME globals to avoid parameters!!!!! I need these down deep in predTransition
	    this._input = null;
	    this._startIndex = 0;
	    this._outerContext = null;
	    this._dfa = null;
	    // Each prediction operation uses a cache for merge of prediction contexts.
	    //  Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
	    //  isn't synchronized but we're ok since two threads shouldn't reuse same
	    //  parser/atnsim object because it can only handle one input at a time.
	    //  This maps graphs a and b to merged result c. (a,b)&rarr;c. We can avoid
	    //  the merge if we ever see a and b again.  Note that (b,a)&rarr;c should
	    //  also be examined during cache lookup.
	    //
	    this.mergeCache = null;
	    return this;
	}

	ParserATNSimulator.prototype = Object.create(ATNSimulator.prototype);
	ParserATNSimulator.prototype.constructor = ParserATNSimulator;

	ParserATNSimulator.prototype.debug = false;
	ParserATNSimulator.prototype.debug_closure = false;
	ParserATNSimulator.prototype.debug_add = false;
	ParserATNSimulator.prototype.debug_list_atn_decisions = false;
	ParserATNSimulator.prototype.dfa_debug = false;
	ParserATNSimulator.prototype.retry_debug = false;

	ParserATNSimulator.prototype.reset = function () {};

	ParserATNSimulator.prototype.adaptivePredict = function (input, decision, outerContext) {
	    if (this.debug || this.debug_list_atn_decisions) {
	        console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
	    }
	    this._input = input;
	    this._startIndex = input.index;
	    this._outerContext = outerContext;

	    var dfa = this.decisionToDFA[decision];
	    this._dfa = dfa;
	    var m = input.mark();
	    var index = input.index;

	    // Now we are certain to have a specific decision's DFA
	    // But, do we still need an initial state?
	    try {
	        var s0;
	        if (dfa.precedenceDfa) {
	            // the start state for a precedence DFA depends on the current
	            // parser precedence, and is provided by a DFA method.
	            s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
	        } else {
	            // the start state for a "regular" DFA is just s0
	            s0 = dfa.s0;
	        }
	        if (s0 === null) {
	            if (outerContext === null) {
	                outerContext = RuleContext.EMPTY;
	            }
	            if (this.debug || this.debug_list_atn_decisions) {
	                console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
	            }

	            var fullCtx = false;
	            var s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);

	            if (dfa.precedenceDfa) {
	                // If this is a precedence DFA, we use applyPrecedenceFilter
	                // to convert the computed start state to a precedence start
	                // state. We then use DFA.setPrecedenceStartState to set the
	                // appropriate start state for the precedence level rather
	                // than simply setting DFA.s0.
	                //
	                dfa.s0.configs = s0_closure; // not used for prediction but useful to know start configs anyway
	                s0_closure = this.applyPrecedenceFilter(s0_closure);
	                s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
	                dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
	            } else {
	                s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
	                dfa.s0 = s0;
	            }
	        }
	        var alt = this.execATN(dfa, s0, input, index, outerContext);
	        if (this.debug) {
	            console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
	        }
	        return alt;
	    } finally {
	        this._dfa = null;
	        this.mergeCache = null; // wack cache after each prediction
	        input.seek(index);
	        input.release(m);
	    }
	};
	// Performs ATN simulation to compute a predicted alternative based
	//  upon the remaining input, but also updates the DFA cache to avoid
	//  having to traverse the ATN again for the same input sequence.

	// There are some key conditions we're looking for after computing a new
	// set of ATN configs (proposed DFA state):
	// if the set is empty, there is no viable alternative for current symbol
	// does the state uniquely predict an alternative?
	// does the state have a conflict that would prevent us from
	//   putting it on the work list?

	// We also have some key operations to do:
	// add an edge from previous DFA state to potentially new DFA state, D,
	//   upon current symbol but only if adding to work list, which means in all
	//   cases except no viable alternative (and possibly non-greedy decisions?)
	// collecting predicates and adding semantic context to DFA accept states
	// adding rule context to context-sensitive DFA accept states
	// consuming an input symbol
	// reporting a conflict
	// reporting an ambiguity
	// reporting a context sensitivity
	// reporting insufficient predicates

	// cover these cases:
	//    dead end
	//    single alt
	//    single alt + preds
	//    conflict
	//    conflict + preds
	//
	ParserATNSimulator.prototype.execATN = function (dfa, s0, input, startIndex, outerContext) {
	    if (this.debug || this.debug_list_atn_decisions) {
	        console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
	    }
	    var alt;
	    var previousD = s0;

	    if (this.debug) {
	        console.log("s0 = " + s0);
	    }
	    var t = input.LA(1);
	    while (true) {
	        // while more work
	        var D = this.getExistingTargetState(previousD, t);
	        if (D === null) {
	            D = this.computeTargetState(dfa, previousD, t);
	        }
	        if (D === ATNSimulator.ERROR) {
	            // if any configs in previous dipped into outer context, that
	            // means that input up to t actually finished entry rule
	            // at least for SLL decision. Full LL doesn't dip into outer
	            // so don't need special case.
	            // We will get an error no matter what so delay until after
	            // decision; better error message. Also, no reachable target
	            // ATN states in SLL implies LL will also get nowhere.
	            // If conflict in states that dip out, choose min since we
	            // will get error no matter what.
	            var e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
	            input.seek(startIndex);
	            alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);
	            if (alt !== ATN.INVALID_ALT_NUMBER) {
	                return alt;
	            } else {
	                throw e;
	            }
	        }
	        if (D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
	            // IF PREDS, MIGHT RESOLVE TO SINGLE ALT => SLL (or syntax error)
	            var conflictingAlts = null;
	            if (D.predicates !== null) {
	                if (this.debug) {
	                    console.log("DFA state has preds in DFA sim LL failover");
	                }
	                var conflictIndex = input.index;
	                if (conflictIndex !== startIndex) {
	                    input.seek(startIndex);
	                }
	                conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);
	                if (conflictingAlts.length === 1) {
	                    if (this.debug) {
	                        console.log("Full LL avoided");
	                    }
	                    return conflictingAlts.minValue();
	                }
	                if (conflictIndex !== startIndex) {
	                    // restore the index so reporting the fallback to full
	                    // context occurs with the index at the correct spot
	                    input.seek(conflictIndex);
	                }
	            }
	            if (this.dfa_debug) {
	                console.log("ctx sensitive state " + outerContext + " in " + D);
	            }
	            var fullCtx = true;
	            var s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
	            this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
	            alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
	            return alt;
	        }
	        if (D.isAcceptState) {
	            if (D.predicates === null) {
	                return D.prediction;
	            }
	            var stopIndex = input.index;
	            input.seek(startIndex);
	            var alts = this.evalSemanticContext(D.predicates, outerContext, true);
	            if (alts.length === 0) {
	                throw this.noViableAlt(input, outerContext, D.configs, startIndex);
	            } else if (alts.length === 1) {
	                return alts.minValue();
	            } else {
	                // report ambiguity after predicate evaluation to make sure the correct set of ambig alts is reported.
	                this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
	                return alts.minValue();
	            }
	        }
	        previousD = D;

	        if (t !== Token.EOF) {
	            input.consume();
	            t = input.LA(1);
	        }
	    }
	};
	//
	// Get an existing target state for an edge in the DFA. If the target state
	// for the edge has not yet been computed or is otherwise not available,
	// this method returns {@code null}.
	//
	// @param previousD The current DFA state
	// @param t The next input symbol
	// @return The existing target DFA state for the given input symbol
	// {@code t}, or {@code null} if the target state for this edge is not
	// already cached
	//
	ParserATNSimulator.prototype.getExistingTargetState = function (previousD, t) {
	    var edges = previousD.edges;
	    if (edges === null) {
	        return null;
	    } else {
	        return edges[t + 1] || null;
	    }
	};
	//
	// Compute a target state for an edge in the DFA, and attempt to add the
	// computed state and corresponding edge to the DFA.
	//
	// @param dfa The DFA
	// @param previousD The current DFA state
	// @param t The next input symbol
	//
	// @return The computed target DFA state for the given input symbol
	// {@code t}. If {@code t} does not lead to a valid DFA state, this method
	// returns {@link //ERROR}.
	//
	ParserATNSimulator.prototype.computeTargetState = function (dfa, previousD, t) {
	    var reach = this.computeReachSet(previousD.configs, t, false);
	    if (reach === null) {
	        this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
	        return ATNSimulator.ERROR;
	    }
	    // create new target state; we'll add to DFA after it's complete
	    var D = new DFAState(null, reach);

	    var predictedAlt = this.getUniqueAlt(reach);

	    if (this.debug) {
	        var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
	        console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) + ", previous=" + previousD.configs + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
	    }
	    if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
	        // NO CONFLICT, UNIQUELY PREDICTED ALT
	        D.isAcceptState = true;
	        D.configs.uniqueAlt = predictedAlt;
	        D.prediction = predictedAlt;
	    } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
	        // MORE THAN ONE VIABLE ALTERNATIVE
	        D.configs.conflictingAlts = this.getConflictingAlts(reach);
	        D.requiresFullContext = true;
	        // in SLL-only mode, we will stop at this state and return the minimum alt
	        D.isAcceptState = true;
	        D.prediction = D.configs.conflictingAlts.minValue();
	    }
	    if (D.isAcceptState && D.configs.hasSemanticContext) {
	        this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
	        if (D.predicates !== null) {
	            D.prediction = ATN.INVALID_ALT_NUMBER;
	        }
	    }
	    // all adds to dfa are done after we've created full D state
	    D = this.addDFAEdge(dfa, previousD, t, D);
	    return D;
	};

	ParserATNSimulator.prototype.predicateDFAState = function (dfaState, decisionState) {
	    // We need to test all predicates, even in DFA states that
	    // uniquely predict alternative.
	    var nalts = decisionState.transitions.length;
	    // Update DFA so reach becomes accept state with (predicate,alt)
	    // pairs if preds found for conflicting alts
	    var altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
	    var altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);
	    if (altToPred !== null) {
	        dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
	        dfaState.prediction = ATN.INVALID_ALT_NUMBER; // make sure we use preds
	    } else {
	        // There are preds in configs but they might go away
	        // when OR'd together like {p}? || NONE == NONE. If neither
	        // alt has preds, resolve to min alt
	        dfaState.prediction = altsToCollectPredsFrom.minValue();
	    }
	};

	// comes back with reach.uniqueAlt set to a valid alt
	ParserATNSimulator.prototype.execATNWithFullContext = function (dfa, D, // how far we got before failing over
	s0, input, startIndex, outerContext) {
	    if (this.debug || this.debug_list_atn_decisions) {
	        console.log("execATNWithFullContext " + s0);
	    }
	    var fullCtx = true;
	    var foundExactAmbig = false;
	    var reach = null;
	    var previous = s0;
	    input.seek(startIndex);
	    var t = input.LA(1);
	    var predictedAlt = -1;
	    while (true) {
	        // while more work
	        reach = this.computeReachSet(previous, t, fullCtx);
	        if (reach === null) {
	            // if any configs in previous dipped into outer context, that
	            // means that input up to t actually finished entry rule
	            // at least for LL decision. Full LL doesn't dip into outer
	            // so don't need special case.
	            // We will get an error no matter what so delay until after
	            // decision; better error message. Also, no reachable target
	            // ATN states in SLL implies LL will also get nowhere.
	            // If conflict in states that dip out, choose min since we
	            // will get error no matter what.
	            var e = this.noViableAlt(input, outerContext, previous, startIndex);
	            input.seek(startIndex);
	            var alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
	            if (alt !== ATN.INVALID_ALT_NUMBER) {
	                return alt;
	            } else {
	                throw e;
	            }
	        }
	        var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
	        if (this.debug) {
	            console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
	        }
	        reach.uniqueAlt = this.getUniqueAlt(reach);
	        // unique prediction?
	        if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
	            predictedAlt = reach.uniqueAlt;
	            break;
	        } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
	            predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);
	            if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
	                break;
	            }
	        } else {
	            // In exact ambiguity mode, we never try to terminate early.
	            // Just keeps scarfing until we know what the conflict is
	            if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
	                foundExactAmbig = true;
	                predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
	                break;
	            }
	            // else there are multiple non-conflicting subsets or
	            // we're not sure what the ambiguity is yet.
	            // So, keep going.
	        }
	        previous = reach;
	        if (t !== Token.EOF) {
	            input.consume();
	            t = input.LA(1);
	        }
	    }
	    // If the configuration set uniquely predicts an alternative,
	    // without conflict, then we know that it's a full LL decision
	    // not SLL.
	    if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
	        this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
	        return predictedAlt;
	    }
	    // We do not check predicates here because we have checked them
	    // on-the-fly when doing full context prediction.

	    //
	    // In non-exact ambiguity detection mode, we might	actually be able to
	    // detect an exact ambiguity, but I'm not going to spend the cycles
	    // needed to check. We only emit ambiguity warnings in exact ambiguity
	    // mode.
	    //
	    // For example, we might know that we have conflicting configurations.
	    // But, that does not mean that there is no way forward without a
	    // conflict. It's possible to have nonconflicting alt subsets as in:

	    // altSubSets=[{1, 2}, {1, 2}, {1}, {1, 2}]

	    // from
	    //
	    //    [(17,1,[5 $]), (13,1,[5 10 $]), (21,1,[5 10 $]), (11,1,[$]),
	    //     (13,2,[5 10 $]), (21,2,[5 10 $]), (11,2,[$])]
	    //
	    // In this case, (17,1,[5 $]) indicates there is some next sequence that
	    // would resolve this without conflict to alternative 1. Any other viable
	    // next sequence, however, is associated with a conflict.  We stop
	    // looking for input because no amount of further lookahead will alter
	    // the fact that we should predict alternative 1.  We just can't say for
	    // sure that there is an ambiguity without looking further.

	    this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);

	    return predictedAlt;
	};

	ParserATNSimulator.prototype.computeReachSet = function (closure, t, fullCtx) {
	    if (this.debug) {
	        console.log("in computeReachSet, starting closure: " + closure);
	    }
	    if (this.mergeCache === null) {
	        this.mergeCache = new DoubleDict();
	    }
	    var intermediate = new ATNConfigSet(fullCtx);

	    // Configurations already in a rule stop state indicate reaching the end
	    // of the decision rule (local context) or end of the start rule (full
	    // context). Once reached, these configurations are never updated by a
	    // closure operation, so they are handled separately for the performance
	    // advantage of having a smaller intermediate set when calling closure.
	    //
	    // For full-context reach operations, separate handling is required to
	    // ensure that the alternative matching the longest overall sequence is
	    // chosen when multiple such configurations can match the input.

	    var skippedStopStates = null;

	    // First figure out where we can reach on input t
	    for (var i = 0; i < closure.items.length; i++) {
	        var c = closure.items[i];
	        if (this.debug_add) {
	            console.log("testing " + this.getTokenName(t) + " at " + c);
	        }
	        if (c.state instanceof RuleStopState) {
	            if (fullCtx || t === Token.EOF) {
	                if (skippedStopStates === null) {
	                    skippedStopStates = [];
	                }
	                skippedStopStates.push(c);
	                if (this.debug_add) {
	                    console.log("added " + c + " to skippedStopStates");
	                }
	            }
	            continue;
	        }
	        for (var j = 0; j < c.state.transitions.length; j++) {
	            var trans = c.state.transitions[j];
	            var target = this.getReachableTarget(trans, t);
	            if (target !== null) {
	                var cfg = new ATNConfig({ state: target }, c);
	                intermediate.add(cfg, this.mergeCache);
	                if (this.debug_add) {
	                    console.log("added " + cfg + " to intermediate");
	                }
	            }
	        }
	    }
	    // Now figure out where the reach operation can take us...
	    var reach = null;

	    // This block optimizes the reach operation for intermediate sets which
	    // trivially indicate a termination state for the overall
	    // adaptivePredict operation.
	    //
	    // The conditions assume that intermediate
	    // contains all configurations relevant to the reach set, but this
	    // condition is not true when one or more configurations have been
	    // withheld in skippedStopStates, or when the current symbol is EOF.
	    //
	    if (skippedStopStates === null && t !== Token.EOF) {
	        if (intermediate.items.length === 1) {
	            // Don't pursue the closure if there is just one state.
	            // It can only have one alternative; just add to result
	            // Also don't pursue the closure if there is unique alternative
	            // among the configurations.
	            reach = intermediate;
	        } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
	            // Also don't pursue the closure if there is unique alternative
	            // among the configurations.
	            reach = intermediate;
	        }
	    }
	    // If the reach set could not be trivially determined, perform a closure
	    // operation on the intermediate set to compute its initial value.
	    //
	    if (reach === null) {
	        reach = new ATNConfigSet(fullCtx);
	        var closureBusy = new Set();
	        var treatEofAsEpsilon = t === Token.EOF;
	        for (var k = 0; k < intermediate.items.length; k++) {
	            this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
	        }
	    }
	    if (t === Token.EOF) {
	        // After consuming EOF no additional input is possible, so we are
	        // only interested in configurations which reached the end of the
	        // decision rule (local context) or end of the start rule (full
	        // context). Update reach to contain only these configurations. This
	        // handles both explicit EOF transitions in the grammar and implicit
	        // EOF transitions following the end of the decision or start rule.
	        //
	        // When reach==intermediate, no closure operation was performed. In
	        // this case, removeAllConfigsNotInRuleStopState needs to check for
	        // reachable rule stop states as well as configurations already in
	        // a rule stop state.
	        //
	        // This is handled before the configurations in skippedStopStates,
	        // because any configurations potentially added from that list are
	        // already guaranteed to meet this condition whether or not it's
	        // required.
	        //
	        reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
	    }
	    // If skippedStopStates!==null, then it contains at least one
	    // configuration. For full-context reach operations, these
	    // configurations reached the end of the start rule, in which case we
	    // only add them back to reach if no configuration during the current
	    // closure operation reached such a state. This ensures adaptivePredict
	    // chooses an alternative matching the longest overall sequence when
	    // multiple alternatives are viable.
	    //
	    if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) {
	        for (var l = 0; l < skippedStopStates.length; l++) {
	            reach.add(skippedStopStates[l], this.mergeCache);
	        }
	    }
	    if (reach.items.length === 0) {
	        return null;
	    } else {
	        return reach;
	    }
	};
	//
	// Return a configuration set containing only the configurations from
	// {@code configs} which are in a {@link RuleStopState}. If all
	// configurations in {@code configs} are already in a rule stop state, this
	// method simply returns {@code configs}.
	//
	// <p>When {@code lookToEndOfRule} is true, this method uses
	// {@link ATN//nextTokens} for each configuration in {@code configs} which is
	// not already in a rule stop state to see if a rule stop state is reachable
	// from the configuration via epsilon-only transitions.</p>
	//
	// @param configs the configuration set to update
	// @param lookToEndOfRule when true, this method checks for rule stop states
	// reachable by epsilon-only transitions from each configuration in
	// {@code configs}.
	//
	// @return {@code configs} if all configurations in {@code configs} are in a
	// rule stop state, otherwise return a new configuration set containing only
	// the configurations from {@code configs} which are in a rule stop state
	//
	ParserATNSimulator.prototype.removeAllConfigsNotInRuleStopState = function (configs, lookToEndOfRule) {
	    if (PredictionMode.allConfigsInRuleStopStates(configs)) {
	        return configs;
	    }
	    var result = new ATNConfigSet(configs.fullCtx);
	    for (var i = 0; i < configs.items.length; i++) {
	        var config = configs.items[i];
	        if (config.state instanceof RuleStopState) {
	            result.add(config, this.mergeCache);
	            continue;
	        }
	        if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
	            var nextTokens = this.atn.nextTokens(config.state);
	            if (nextTokens.contains(Token.EPSILON)) {
	                var endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
	                result.add(new ATNConfig({ state: endOfRuleState }, config), this.mergeCache);
	            }
	        }
	    }
	    return result;
	};

	ParserATNSimulator.prototype.computeStartState = function (p, ctx, fullCtx) {
	    // always at least the implicit call to start rule
	    var initialContext = predictionContextFromRuleContext(this.atn, ctx);
	    var configs = new ATNConfigSet(fullCtx);
	    for (var i = 0; i < p.transitions.length; i++) {
	        var target = p.transitions[i].target;
	        var c = new ATNConfig({ state: target, alt: i + 1, context: initialContext }, null);
	        var closureBusy = new Set();
	        this.closure(c, configs, closureBusy, true, fullCtx, false);
	    }
	    return configs;
	};

	//
	// This method transforms the start state computed by
	// {@link //computeStartState} to the special start state used by a
	// precedence DFA for a particular precedence value. The transformation
	// process applies the following changes to the start state's configuration
	// set.
	//
	// <ol>
	// <li>Evaluate the precedence predicates for each configuration using
	// {@link SemanticContext//evalPrecedence}.</li>
	// <li>Remove all configurations which predict an alternative greater than
	// 1, for which another configuration that predicts alternative 1 is in the
	// same ATN state with the same prediction context. This transformation is
	// valid for the following reasons:
	// <ul>
	// <li>The closure block cannot contain any epsilon transitions which bypass
	// the body of the closure, so all states reachable via alternative 1 are
	// part of the precedence alternatives of the transformed left-recursive
	// rule.</li>
	// <li>The "primary" portion of a left recursive rule cannot contain an
	// epsilon transition, so the only way an alternative other than 1 can exist
	// in a state that is also reachable via alternative 1 is by nesting calls
	// to the left-recursive rule, with the outer calls not being at the
	// preferred precedence level.</li>
	// </ul>
	// </li>
	// </ol>
	//
	// <p>
	// The prediction context must be considered by this filter to address
	// situations like the following.
	// </p>
	// <code>
	// <pre>
	// grammar TA;
	// prog: statement* EOF;
	// statement: letterA | statement letterA 'b' ;
	// letterA: 'a';
	// </pre>
	// </code>
	// <p>
	// If the above grammar, the ATN state immediately before the token
	// reference {@code 'a'} in {@code letterA} is reachable from the left edge
	// of both the primary and closure blocks of the left-recursive rule
	// {@code statement}. The prediction context associated with each of these
	// configurations distinguishes between them, and prevents the alternative
	// which stepped out to {@code prog} (and then back in to {@code statement}
	// from being eliminated by the filter.
	// </p>
	//
	// @param configs The configuration set computed by
	// {@link //computeStartState} as the start state for the DFA.
	// @return The transformed configuration set representing the start state
	// for a precedence DFA at a particular precedence level (determined by
	// calling {@link Parser//getPrecedence}).
	//
	ParserATNSimulator.prototype.applyPrecedenceFilter = function (configs) {
	    var config;
	    var statesFromAlt1 = [];
	    var configSet = new ATNConfigSet(configs.fullCtx);
	    for (var i = 0; i < configs.items.length; i++) {
	        config = configs.items[i];
	        // handle alt 1 first
	        if (config.alt !== 1) {
	            continue;
	        }
	        var updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);
	        if (updatedContext === null) {
	            // the configuration was eliminated
	            continue;
	        }
	        statesFromAlt1[config.state.stateNumber] = config.context;
	        if (updatedContext !== config.semanticContext) {
	            configSet.add(new ATNConfig({ semanticContext: updatedContext }, config), this.mergeCache);
	        } else {
	            configSet.add(config, this.mergeCache);
	        }
	    }
	    for (i = 0; i < configs.items.length; i++) {
	        config = configs.items[i];
	        if (config.alt === 1) {
	            // already handled
	            continue;
	        }
	        // In the future, this elimination step could be updated to also
	        // filter the prediction context for alternatives predicting alt>1
	        // (basically a graph subtraction algorithm).
	        if (!config.precedenceFilterSuppressed) {
	            var context = statesFromAlt1[config.state.stateNumber] || null;
	            if (context !== null && context.equals(config.context)) {
	                // eliminated
	                continue;
	            }
	        }
	        configSet.add(config, this.mergeCache);
	    }
	    return configSet;
	};

	ParserATNSimulator.prototype.getReachableTarget = function (trans, ttype) {
	    if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
	        return trans.target;
	    } else {
	        return null;
	    }
	};

	ParserATNSimulator.prototype.getPredsForAmbigAlts = function (ambigAlts, configs, nalts) {
	    // REACH=[1|1|[]|0:0, 1|2|[]|0:1]
	    // altToPred starts as an array of all null contexts. The entry at index i
	    // corresponds to alternative i. altToPred[i] may have one of three values:
	    //   1. null: no ATNConfig c is found such that c.alt==i
	    //   2. SemanticContext.NONE: At least one ATNConfig c exists such that
	    //      c.alt==i and c.semanticContext==SemanticContext.NONE. In other words,
	    //      alt i has at least one unpredicated config.
	    //   3. Non-NONE Semantic Context: There exists at least one, and for all
	    //      ATNConfig c such that c.alt==i, c.semanticContext!=SemanticContext.NONE.
	    //
	    // From this, it is clear that NONE||anything==NONE.
	    //
	    var altToPred = [];
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (ambigAlts.contains(c.alt)) {
	            altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
	        }
	    }
	    var nPredAlts = 0;
	    for (i = 1; i < nalts + 1; i++) {
	        var pred = altToPred[i] || null;
	        if (pred === null) {
	            altToPred[i] = SemanticContext.NONE;
	        } else if (pred !== SemanticContext.NONE) {
	            nPredAlts += 1;
	        }
	    }
	    // nonambig alts are null in altToPred
	    if (nPredAlts === 0) {
	        altToPred = null;
	    }
	    if (this.debug) {
	        console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
	    }
	    return altToPred;
	};

	ParserATNSimulator.prototype.getPredicatePredictions = function (ambigAlts, altToPred) {
	    var pairs = [];
	    var containsPredicate = false;
	    for (var i = 1; i < altToPred.length; i++) {
	        var pred = altToPred[i];
	        // unpredicated is indicated by SemanticContext.NONE
	        if (ambigAlts !== null && ambigAlts.contains(i)) {
	            pairs.push(new PredPrediction(pred, i));
	        }
	        if (pred !== SemanticContext.NONE) {
	            containsPredicate = true;
	        }
	    }
	    if (!containsPredicate) {
	        return null;
	    }
	    return pairs;
	};

	//
	// This method is used to improve the localization of error messages by
	// choosing an alternative rather than throwing a
	// {@link NoViableAltException} in particular prediction scenarios where the
	// {@link //ERROR} state was reached during ATN simulation.
	//
	// <p>
	// The default implementation of this method uses the following
	// algorithm to identify an ATN configuration which successfully parsed the
	// decision entry rule. Choosing such an alternative ensures that the
	// {@link ParserRuleContext} returned by the calling rule will be complete
	// and valid, and the syntax error will be reported later at a more
	// localized location.</p>
	//
	// <ul>
	// <li>If a syntactically valid path or paths reach the end of the decision rule and
	// they are semantically valid if predicated, return the min associated alt.</li>
	// <li>Else, if a semantically invalid but syntactically valid path exist
	// or paths exist, return the minimum associated alt.
	// </li>
	// <li>Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.</li>
	// </ul>
	//
	// <p>
	// In some scenarios, the algorithm described above could predict an
	// alternative which will result in a {@link FailedPredicateException} in
	// the parser. Specifically, this could occur if the <em>only</em> configuration
	// capable of successfully parsing to the end of the decision rule is
	// blocked by a semantic predicate. By choosing this alternative within
	// {@link //adaptivePredict} instead of throwing a
	// {@link NoViableAltException}, the resulting
	// {@link FailedPredicateException} in the parser will identify the specific
	// predicate which is preventing the parser from successfully parsing the
	// decision rule, which helps developers identify and correct logic errors
	// in semantic predicates.
	// </p>
	//
	// @param configs The ATN configurations which were valid immediately before
	// the {@link //ERROR} state was reached
	// @param outerContext The is the \gamma_0 initial parser context from the paper
	// or the parser stack at the instant before prediction commences.
	//
	// @return The value to return from {@link //adaptivePredict}, or
	// {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
	// identified and {@link //adaptivePredict} should report an error instead.
	//
	ParserATNSimulator.prototype.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule = function (configs, outerContext) {
	    var cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
	    var semValidConfigs = cfgs[0];
	    var semInvalidConfigs = cfgs[1];
	    var alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
	    if (alt !== ATN.INVALID_ALT_NUMBER) {
	        // semantically/syntactically viable path exists
	        return alt;
	    }
	    // Is there a syntactically valid path with a failed pred?
	    if (semInvalidConfigs.items.length > 0) {
	        alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
	        if (alt !== ATN.INVALID_ALT_NUMBER) {
	            // syntactically viable path exists
	            return alt;
	        }
	    }
	    return ATN.INVALID_ALT_NUMBER;
	};

	ParserATNSimulator.prototype.getAltThatFinishedDecisionEntryRule = function (configs) {
	    var alts = [];
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
	            if (alts.indexOf(c.alt) < 0) {
	                alts.push(c.alt);
	            }
	        }
	    }
	    if (alts.length === 0) {
	        return ATN.INVALID_ALT_NUMBER;
	    } else {
	        return Math.min.apply(null, alts);
	    }
	};
	// Walk the list of configurations and split them according to
	//  those that have preds evaluating to true/false.  If no pred, assume
	//  true pred and include in succeeded set.  Returns Pair of sets.
	//
	//  Create a new set so as not to alter the incoming parameter.
	//
	//  Assumption: the input stream has been restored to the starting point
	//  prediction, which is where predicates need to evaluate.
	//
	ParserATNSimulator.prototype.splitAccordingToSemanticValidity = function (configs, outerContext) {
	    var succeeded = new ATNConfigSet(configs.fullCtx);
	    var failed = new ATNConfigSet(configs.fullCtx);
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (c.semanticContext !== SemanticContext.NONE) {
	            var predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);
	            if (predicateEvaluationResult) {
	                succeeded.add(c);
	            } else {
	                failed.add(c);
	            }
	        } else {
	            succeeded.add(c);
	        }
	    }
	    return [succeeded, failed];
	};

	// Look through a list of predicate/alt pairs, returning alts for the
	//  pairs that win. A {@code NONE} predicate indicates an alt containing an
	//  unpredicated config which behaves as "always true." If !complete
	//  then we stop at the first predicate that evaluates to true. This
	//  includes pairs with null predicates.
	//
	ParserATNSimulator.prototype.evalSemanticContext = function (predPredictions, outerContext, complete) {
	    var predictions = new BitSet();
	    for (var i = 0; i < predPredictions.length; i++) {
	        var pair = predPredictions[i];
	        if (pair.pred === SemanticContext.NONE) {
	            predictions.add(pair.alt);
	            if (!complete) {
	                break;
	            }
	            continue;
	        }
	        var predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
	        if (this.debug || this.dfa_debug) {
	            console.log("eval pred " + pair + "=" + predicateEvaluationResult);
	        }
	        if (predicateEvaluationResult) {
	            if (this.debug || this.dfa_debug) {
	                console.log("PREDICT " + pair.alt);
	            }
	            predictions.add(pair.alt);
	            if (!complete) {
	                break;
	            }
	        }
	    }
	    return predictions;
	};

	// TODO: If we are doing predicates, there is no point in pursuing
	//     closure operations if we reach a DFA state that uniquely predicts
	//     alternative. We will not be caching that DFA state and it is a
	//     waste to pursue the closure. Might have to advance when we do
	//     ambig detection thought :(
	//

	ParserATNSimulator.prototype.closure = function (config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
	    var initialDepth = 0;
	    this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, initialDepth, treatEofAsEpsilon);
	};

	ParserATNSimulator.prototype.closureCheckingStopState = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
	    if (this.debug || this.debug_closure) {
	        console.log("closure(" + config.toString(this.parser, true) + ")");
	        // console.log("configs(" + configs.toString() + ")");
	        if (config.reachesIntoOuterContext > 50) {
	            throw "problem";
	        }
	    }
	    if (config.state instanceof RuleStopState) {
	        // We hit rule end. If we have context info, use it
	        // run thru all possible stack tops in ctx
	        if (!config.context.isEmpty()) {
	            for (var i = 0; i < config.context.length; i++) {
	                if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
	                    if (fullCtx) {
	                        configs.add(new ATNConfig({ state: config.state, context: PredictionContext.EMPTY }, config), this.mergeCache);
	                        continue;
	                    } else {
	                        // we have no context info, just chase follow links (if greedy)
	                        if (this.debug) {
	                            console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
	                        }
	                        this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
	                    }
	                    continue;
	                }
	                var returnState = this.atn.states[config.context.getReturnState(i)];
	                var newContext = config.context.getParent(i); // "pop" return state
	                var parms = { state: returnState, alt: config.alt, context: newContext, semanticContext: config.semanticContext };
	                var c = new ATNConfig(parms, null);
	                // While we have context to pop back from, we may have
	                // gotten that context AFTER having falling off a rule.
	                // Make sure we track that we are now out of context.
	                c.reachesIntoOuterContext = config.reachesIntoOuterContext;
	                this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
	            }
	            return;
	        } else if (fullCtx) {
	            // reached end of start rule
	            configs.add(config, this.mergeCache);
	            return;
	        } else {
	            // else if we have no context info, just chase follow links (if greedy)
	            if (this.debug) {
	                console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
	            }
	        }
	    }
	    this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
	};

	// Do the actual work of walking epsilon edges//
	ParserATNSimulator.prototype.closure_ = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
	    var p = config.state;
	    // optimization
	    if (!p.epsilonOnlyTransitions) {
	        configs.add(config, this.mergeCache);
	        // make sure to not return here, because EOF transitions can act as
	        // both epsilon transitions and non-epsilon transitions.
	    }
	    for (var i = 0; i < p.transitions.length; i++) {
	        if (i == 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config)) continue;

	        var t = p.transitions[i];
	        var continueCollecting = collectPredicates && !(t instanceof ActionTransition);
	        var c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
	        if (c !== null) {
	            if (!t.isEpsilon && closureBusy.add(c) !== c) {
	                // avoid infinite recursion for EOF* and EOF+
	                continue;
	            }
	            var newDepth = depth;
	            if (config.state instanceof RuleStopState) {
	                // target fell off end of rule; mark resulting c as having dipped into outer context
	                // We can't get here if incoming config was rule stop and we had context
	                // track how far we dip into outer context.  Might
	                // come in handy and we avoid evaluating context dependent
	                // preds if this is > 0.

	                if (closureBusy.add(c) !== c) {
	                    // avoid infinite recursion for right-recursive rules
	                    continue;
	                }

	                if (this._dfa !== null && this._dfa.precedenceDfa) {
	                    if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
	                        c.precedenceFilterSuppressed = true;
	                    }
	                }

	                c.reachesIntoOuterContext += 1;
	                configs.dipsIntoOuterContext = true; // TODO: can remove? only care when we add to set per middle of this method
	                newDepth -= 1;
	                if (this.debug) {
	                    console.log("dips into outer ctx: " + c);
	                }
	            } else if (t instanceof RuleTransition) {
	                // latch when newDepth goes negative - once we step out of the entry context we can't return
	                if (newDepth >= 0) {
	                    newDepth += 1;
	                }
	            }
	            this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
	        }
	    }
	};

	ParserATNSimulator.prototype.canDropLoopEntryEdgeInLeftRecursiveRule = function (config) {
	    // return False
	    var p = config.state;
	    // First check to see if we are in StarLoopEntryState generated during
	    // left-recursion elimination. For efficiency, also check if
	    // the context has an empty stack case. If so, it would mean
	    // global FOLLOW so we can't perform optimization
	    // Are we the special loop entry/exit state? or SLL wildcard
	    if (p.stateType != ATNState.STAR_LOOP_ENTRY) return false;
	    if (p.stateType != ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath()) return false;

	    // Require all return states to return back to the same rule that p is in.
	    var numCtxs = config.context.length;
	    for (var i = 0; i < numCtxs; i++) {
	        // for each stack context
	        var returnState = this.atn.states[config.context.getReturnState(i)];
	        if (returnState.ruleIndex != p.ruleIndex) return false;
	    }

	    var decisionStartState = p.transitions[0].target;
	    var blockEndStateNum = decisionStartState.endState.stateNumber;
	    var blockEndState = this.atn.states[blockEndStateNum];

	    // Verify that the top of each stack context leads to loop entry/exit
	    // state through epsilon edges and w/o leaving rule.
	    for (var i = 0; i < numCtxs; i++) {
	        // for each stack context
	        var returnStateNumber = config.context.getReturnState(i);
	        var returnState = this.atn.states[returnStateNumber];
	        // all states must have single outgoing epsilon edge
	        if (returnState.transitions.length != 1 || !returnState.transitions[0].isEpsilon) return false;

	        // Look for prefix op case like 'not expr', (' type ')' expr
	        var returnStateTarget = returnState.transitions[0].target;
	        if (returnState.stateType == ATNState.BLOCK_END && returnStateTarget == p) continue;

	        // Look for 'expr op expr' or case where expr's return state is block end
	        // of (...)* internal block; the block end points to loop back
	        // which points to p but we don't need to check that
	        if (returnState == blockEndState) continue;

	        // Look for ternary expr ? expr : expr. The return state points at block end,
	        // which points at loop entry state
	        if (returnStateTarget == blockEndState) continue;

	        // Look for complex prefix 'between expr and expr' case where 2nd expr's
	        // return state points at block end state of (...)* internal block
	        if (returnStateTarget.stateType == ATNState.BLOCK_END && returnStateTarget.transitions.length == 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target == p) continue;

	        // anything else ain't conforming
	        return false;
	    }
	    return true;
	};

	ParserATNSimulator.prototype.getRuleName = function (index) {
	    if (this.parser !== null && index >= 0) {
	        return this.parser.ruleNames[index];
	    } else {
	        return "<rule " + index + ">";
	    }
	};

	ParserATNSimulator.prototype.getEpsilonTarget = function (config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
	    switch (t.serializationType) {
	        case Transition.RULE:
	            return this.ruleTransition(config, t);
	        case Transition.PRECEDENCE:
	            return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
	        case Transition.PREDICATE:
	            return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
	        case Transition.ACTION:
	            return this.actionTransition(config, t);
	        case Transition.EPSILON:
	            return new ATNConfig({ state: t.target }, config);
	        case Transition.ATOM:
	        case Transition.RANGE:
	        case Transition.SET:
	            // EOF transitions act like epsilon transitions after the first EOF
	            // transition is traversed
	            if (treatEofAsEpsilon) {
	                if (t.matches(Token.EOF, 0, 1)) {
	                    return new ATNConfig({ state: t.target }, config);
	                }
	            }
	            return null;
	        default:
	            return null;
	    }
	};

	ParserATNSimulator.prototype.actionTransition = function (config, t) {
	    if (this.debug) {
	        var index = t.actionIndex == -1 ? 65535 : t.actionIndex;
	        console.log("ACTION edge " + t.ruleIndex + ":" + index);
	    }
	    return new ATNConfig({ state: t.target }, config);
	};

	ParserATNSimulator.prototype.precedenceTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
	    if (this.debug) {
	        console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");
	        if (this.parser !== null) {
	            console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
	        }
	    }
	    var c = null;
	    if (collectPredicates && inContext) {
	        if (fullCtx) {
	            // In full context mode, we can evaluate predicates on-the-fly
	            // during closure, which dramatically reduces the size of
	            // the config sets. It also obviates the need to test predicates
	            // later during conflict resolution.
	            var currentPosition = this._input.index;
	            this._input.seek(this._startIndex);
	            var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
	            this._input.seek(currentPosition);
	            if (predSucceeds) {
	                c = new ATNConfig({ state: pt.target }, config); // no pred context
	            }
	        } else {
	            newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
	            c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
	        }
	    } else {
	        c = new ATNConfig({ state: pt.target }, config);
	    }
	    if (this.debug) {
	        console.log("config from pred transition=" + c);
	    }
	    return c;
	};

	ParserATNSimulator.prototype.predTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
	    if (this.debug) {
	        console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
	        if (this.parser !== null) {
	            console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
	        }
	    }
	    var c = null;
	    if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
	        if (fullCtx) {
	            // In full context mode, we can evaluate predicates on-the-fly
	            // during closure, which dramatically reduces the size of
	            // the config sets. It also obviates the need to test predicates
	            // later during conflict resolution.
	            var currentPosition = this._input.index;
	            this._input.seek(this._startIndex);
	            var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
	            this._input.seek(currentPosition);
	            if (predSucceeds) {
	                c = new ATNConfig({ state: pt.target }, config); // no pred context
	            }
	        } else {
	            var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
	            c = new ATNConfig({ state: pt.target, semanticContext: newSemCtx }, config);
	        }
	    } else {
	        c = new ATNConfig({ state: pt.target }, config);
	    }
	    if (this.debug) {
	        console.log("config from pred transition=" + c);
	    }
	    return c;
	};

	ParserATNSimulator.prototype.ruleTransition = function (config, t) {
	    if (this.debug) {
	        console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
	    }
	    var returnState = t.followState;
	    var newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
	    return new ATNConfig({ state: t.target, context: newContext }, config);
	};

	ParserATNSimulator.prototype.getConflictingAlts = function (configs) {
	    var altsets = PredictionMode.getConflictingAltSubsets(configs);
	    return PredictionMode.getAlts(altsets);
	};

	// Sam pointed out a problem with the previous definition, v3, of
	// ambiguous states. If we have another state associated with conflicting
	// alternatives, we should keep going. For example, the following grammar
	//
	// s : (ID | ID ID?) ';' ;
	//
	// When the ATN simulation reaches the state before ';', it has a DFA
	// state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
	// 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
	// because alternative to has another way to continue, via [6|2|[]].
	// The key is that we have a single state that has config's only associated
	// with a single alternative, 2, and crucially the state transitions
	// among the configurations are all non-epsilon transitions. That means
	// we don't consider any conflicts that include alternative 2. So, we
	// ignore the conflict between alts 1 and 2. We ignore a set of
	// conflicting alts when there is an intersection with an alternative
	// associated with a single alt state in the state&rarr;config-list map.
	//
	// It's also the case that we might have two conflicting configurations but
	// also a 3rd nonconflicting configuration for a different alternative:
	// [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
	//
	// a : A | A | A B ;
	//
	// After matching input A, we reach the stop state for rule A, state 1.
	// State 8 is the state right before B. Clearly alternatives 1 and 2
	// conflict and no amount of further lookahead will separate the two.
	// However, alternative 3 will be able to continue and so we do not
	// stop working on this state. In the previous example, we're concerned
	// with states associated with the conflicting alternatives. Here alt
	// 3 is not associated with the conflicting configs, but since we can continue
	// looking for input reasonably, I don't declare the state done. We
	// ignore a set of conflicting alts when we have an alternative
	// that we still need to pursue.
	//

	ParserATNSimulator.prototype.getConflictingAltsOrUniqueAlt = function (configs) {
	    var conflictingAlts = null;
	    if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
	        conflictingAlts = new BitSet();
	        conflictingAlts.add(configs.uniqueAlt);
	    } else {
	        conflictingAlts = configs.conflictingAlts;
	    }
	    return conflictingAlts;
	};

	ParserATNSimulator.prototype.getTokenName = function (t) {
	    if (t === Token.EOF) {
	        return "EOF";
	    }
	    if (this.parser !== null && this.parser.literalNames !== null) {
	        if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
	            console.log("" + t + " ttype out of range: " + this.parser.literalNames);
	            console.log("" + this.parser.getInputStream().getTokens());
	        } else {
	            var name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
	            return name + "<" + t + ">";
	        }
	    }
	    return "" + t;
	};

	ParserATNSimulator.prototype.getLookaheadName = function (input) {
	    return this.getTokenName(input.LA(1));
	};

	// Used for debugging in adaptivePredict around execATN but I cut
	//  it out for clarity now that alg. works well. We can leave this
	//  "dead" code for a bit.
	//
	ParserATNSimulator.prototype.dumpDeadEndConfigs = function (nvae) {
	    console.log("dead end configs: ");
	    var decs = nvae.getDeadEndConfigs();
	    for (var i = 0; i < decs.length; i++) {
	        var c = decs[i];
	        var trans = "no edges";
	        if (c.state.transitions.length > 0) {
	            var t = c.state.transitions[0];
	            if (t instanceof AtomTransition) {
	                trans = "Atom " + this.getTokenName(t.label);
	            } else if (t instanceof SetTransition) {
	                var neg = t instanceof NotSetTransition;
	                trans = (neg ? "~" : "") + "Set " + t.set;
	            }
	        }
	        console.error(c.toString(this.parser, true) + ":" + trans);
	    }
	};

	ParserATNSimulator.prototype.noViableAlt = function (input, outerContext, configs, startIndex) {
	    return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
	};

	ParserATNSimulator.prototype.getUniqueAlt = function (configs) {
	    var alt = ATN.INVALID_ALT_NUMBER;
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (alt === ATN.INVALID_ALT_NUMBER) {
	            alt = c.alt; // found first alt
	        } else if (c.alt !== alt) {
	            return ATN.INVALID_ALT_NUMBER;
	        }
	    }
	    return alt;
	};

	//
	// Add an edge to the DFA, if possible. This method calls
	// {@link //addDFAState} to ensure the {@code to} state is present in the
	// DFA. If {@code from} is {@code null}, or if {@code t} is outside the
	// range of edges that can be represented in the DFA tables, this method
	// returns without adding the edge to the DFA.
	//
	// <p>If {@code to} is {@code null}, this method returns {@code null}.
	// Otherwise, this method returns the {@link DFAState} returned by calling
	// {@link //addDFAState} for the {@code to} state.</p>
	//
	// @param dfa The DFA
	// @param from The source state for the edge
	// @param t The input symbol
	// @param to The target state for the edge
	//
	// @return If {@code to} is {@code null}, this method returns {@code null};
	// otherwise this method returns the result of calling {@link //addDFAState}
	// on {@code to}
	//
	ParserATNSimulator.prototype.addDFAEdge = function (dfa, from_, t, to) {
	    if (this.debug) {
	        console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
	    }
	    if (to === null) {
	        return null;
	    }
	    to = this.addDFAState(dfa, to); // used existing if possible not incoming
	    if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
	        return to;
	    }
	    if (from_.edges === null) {
	        from_.edges = [];
	    }
	    from_.edges[t + 1] = to; // connect

	    if (this.debug) {
	        var literalNames = this.parser === null ? null : this.parser.literalNames;
	        var symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
	        console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
	    }
	    return to;
	};
	//
	// Add state {@code D} to the DFA if it is not already present, and return
	// the actual instance stored in the DFA. If a state equivalent to {@code D}
	// is already in the DFA, the existing state is returned. Otherwise this
	// method returns {@code D} after adding it to the DFA.
	//
	// <p>If {@code D} is {@link //ERROR}, this method returns {@link //ERROR} and
	// does not change the DFA.</p>
	//
	// @param dfa The dfa
	// @param D The DFA state to add
	// @return The state stored in the DFA. This will be either the existing
	// state if {@code D} is already in the DFA, or {@code D} itself if the
	// state was not already present.
	//
	ParserATNSimulator.prototype.addDFAState = function (dfa, D) {
	    if (D == ATNSimulator.ERROR) {
	        return D;
	    }
	    var existing = dfa.states.get(D);
	    if (existing !== null) {
	        return existing;
	    }
	    D.stateNumber = dfa.states.length;
	    if (!D.configs.readOnly) {
	        D.configs.optimizeConfigs(this);
	        D.configs.setReadonly(true);
	    }
	    dfa.states.add(D);
	    if (this.debug) {
	        console.log("adding new DFA state: " + D);
	    }
	    return D;
	};

	ParserATNSimulator.prototype.reportAttemptingFullContext = function (dfa, conflictingAlts, configs, startIndex, stopIndex) {
	    if (this.debug || this.retry_debug) {
	        var interval = new Interval(startIndex, stopIndex + 1);
	        console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
	    }
	    if (this.parser !== null) {
	        this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
	    }
	};

	ParserATNSimulator.prototype.reportContextSensitivity = function (dfa, prediction, configs, startIndex, stopIndex) {
	    if (this.debug || this.retry_debug) {
	        var interval = new Interval(startIndex, stopIndex + 1);
	        console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
	    }
	    if (this.parser !== null) {
	        this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
	    }
	};

	// If context sensitive parsing, we know it's ambiguity not conflict//
	ParserATNSimulator.prototype.reportAmbiguity = function (dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
	    if (this.debug || this.retry_debug) {
	        var interval = new Interval(startIndex, stopIndex + 1);
	        console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
	    }
	    if (this.parser !== null) {
	        this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
	    }
	};

	exports.ParserATNSimulator = ParserATNSimulator;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//
	//
	// This enumeration defines the prediction modes available in ANTLR 4 along with
	// utility methods for analyzing configuration sets for conflicts and/or
	// ambiguities.

	var Set = __webpack_require__(5).Set;
	var Map = __webpack_require__(5).Map;
	var BitSet = __webpack_require__(5).BitSet;
	var AltDict = __webpack_require__(5).AltDict;
	var ATN = __webpack_require__(3).ATN;
	var RuleStopState = __webpack_require__(8).RuleStopState;
	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var ATNConfig = __webpack_require__(7).ATNConfig;
	var SemanticContext = __webpack_require__(9).SemanticContext;
	var Hash = __webpack_require__(5).Hash;
	var hashStuff = __webpack_require__(5).hashStuff;
	var equalArrays = __webpack_require__(5).equalArrays;

	function PredictionMode() {
	    return this;
	}

	//
	// The SLL(*) prediction mode. This prediction mode ignores the current
	// parser context when making predictions. This is the fastest prediction
	// mode, and provides correct results for many grammars. This prediction
	// mode is more powerful than the prediction mode provided by ANTLR 3, but
	// may result in syntax errors for grammar and input combinations which are
	// not SLL.
	//
	// <p>
	// When using this prediction mode, the parser will either return a correct
	// parse tree (i.e. the same parse tree that would be returned with the
	// {@link //LL} prediction mode), or it will report a syntax error. If a
	// syntax error is encountered when using the {@link //SLL} prediction mode,
	// it may be due to either an actual syntax error in the input or indicate
	// that the particular combination of grammar and input requires the more
	// powerful {@link //LL} prediction abilities to complete successfully.</p>
	//
	// <p>
	// This prediction mode does not provide any guarantees for prediction
	// behavior for syntactically-incorrect inputs.</p>
	//
	PredictionMode.SLL = 0;
	//
	// The LL(*) prediction mode. This prediction mode allows the current parser
	// context to be used for resolving SLL conflicts that occur during
	// prediction. This is the fastest prediction mode that guarantees correct
	// parse results for all combinations of grammars with syntactically correct
	// inputs.
	//
	// <p>
	// When using this prediction mode, the parser will make correct decisions
	// for all syntactically-correct grammar and input combinations. However, in
	// cases where the grammar is truly ambiguous this prediction mode might not
	// report a precise answer for <em>exactly which</em> alternatives are
	// ambiguous.</p>
	//
	// <p>
	// This prediction mode does not provide any guarantees for prediction
	// behavior for syntactically-incorrect inputs.</p>
	//
	PredictionMode.LL = 1;
	//
	// The LL(*) prediction mode with exact ambiguity detection. In addition to
	// the correctness guarantees provided by the {@link //LL} prediction mode,
	// this prediction mode instructs the prediction algorithm to determine the
	// complete and exact set of ambiguous alternatives for every ambiguous
	// decision encountered while parsing.
	//
	// <p>
	// This prediction mode may be used for diagnosing ambiguities during
	// grammar development. Due to the performance overhead of calculating sets
	// of ambiguous alternatives, this prediction mode should be avoided when
	// the exact results are not necessary.</p>
	//
	// <p>
	// This prediction mode does not provide any guarantees for prediction
	// behavior for syntactically-incorrect inputs.</p>
	//
	PredictionMode.LL_EXACT_AMBIG_DETECTION = 2;

	//
	// Computes the SLL prediction termination condition.
	//
	// <p>
	// This method computes the SLL prediction termination condition for both of
	// the following cases.</p>
	//
	// <ul>
	// <li>The usual SLL+LL fallback upon SLL conflict</li>
	// <li>Pure SLL without LL fallback</li>
	// </ul>
	//
	// <p><strong>COMBINED SLL+LL PARSING</strong></p>
	//
	// <p>When LL-fallback is enabled upon SLL conflict, correct predictions are
	// ensured regardless of how the termination condition is computed by this
	// method. Due to the substantially higher cost of LL prediction, the
	// prediction should only fall back to LL when the additional lookahead
	// cannot lead to a unique SLL prediction.</p>
	//
	// <p>Assuming combined SLL+LL parsing, an SLL configuration set with only
	// conflicting subsets should fall back to full LL, even if the
	// configuration sets don't resolve to the same alternative (e.g.
	// {@code {1,2}} and {@code {3,4}}. If there is at least one non-conflicting
	// configuration, SLL could continue with the hopes that more lookahead will
	// resolve via one of those non-conflicting configurations.</p>
	//
	// <p>Here's the prediction termination rule them: SLL (for SLL+LL parsing)
	// stops when it sees only conflicting configuration subsets. In contrast,
	// full LL keeps going when there is uncertainty.</p>
	//
	// <p><strong>HEURISTIC</strong></p>
	//
	// <p>As a heuristic, we stop prediction when we see any conflicting subset
	// unless we see a state that only has one alternative associated with it.
	// The single-alt-state thing lets prediction continue upon rules like
	// (otherwise, it would admit defeat too soon):</p>
	//
	// <p>{@code [12|1|[], 6|2|[], 12|2|[]]. s : (ID | ID ID?) ';' ;}</p>
	//
	// <p>When the ATN simulation reaches the state before {@code ';'}, it has a
	// DFA state that looks like: {@code [12|1|[], 6|2|[], 12|2|[]]}. Naturally
	// {@code 12|1|[]} and {@code 12|2|[]} conflict, but we cannot stop
	// processing this node because alternative to has another way to continue,
	// via {@code [6|2|[]]}.</p>
	//
	// <p>It also let's us continue for this rule:</p>
	//
	// <p>{@code [1|1|[], 1|2|[], 8|3|[]] a : A | A | A B ;}</p>
	//
	// <p>After matching input A, we reach the stop state for rule A, state 1.
	// State 8 is the state right before B. Clearly alternatives 1 and 2
	// conflict and no amount of further lookahead will separate the two.
	// However, alternative 3 will be able to continue and so we do not stop
	// working on this state. In the previous example, we're concerned with
	// states associated with the conflicting alternatives. Here alt 3 is not
	// associated with the conflicting configs, but since we can continue
	// looking for input reasonably, don't declare the state done.</p>
	//
	// <p><strong>PURE SLL PARSING</strong></p>
	//
	// <p>To handle pure SLL parsing, all we have to do is make sure that we
	// combine stack contexts for configurations that differ only by semantic
	// predicate. From there, we can do the usual SLL termination heuristic.</p>
	//
	// <p><strong>PREDICATES IN SLL+LL PARSING</strong></p>
	//
	// <p>SLL decisions don't evaluate predicates until after they reach DFA stop
	// states because they need to create the DFA cache that works in all
	// semantic situations. In contrast, full LL evaluates predicates collected
	// during start state computation so it can ignore predicates thereafter.
	// This means that SLL termination detection can totally ignore semantic
	// predicates.</p>
	//
	// <p>Implementation-wise, {@link ATNConfigSet} combines stack contexts but not
	// semantic predicate contexts so we might see two configurations like the
	// following.</p>
	//
	// <p>{@code (s, 1, x, {}), (s, 1, x', {p})}</p>
	//
	// <p>Before testing these configurations against others, we have to merge
	// {@code x} and {@code x'} (without modifying the existing configurations).
	// For example, we test {@code (x+x')==x''} when looking for conflicts in
	// the following configurations.</p>
	//
	// <p>{@code (s, 1, x, {}), (s, 1, x', {p}), (s, 2, x'', {})}</p>
	//
	// <p>If the configuration set has predicates (as indicated by
	// {@link ATNConfigSet//hasSemanticContext}), this algorithm makes a copy of
	// the configurations to strip out all of the predicates so that a standard
	// {@link ATNConfigSet} will merge everything ignoring predicates.</p>
	//
	PredictionMode.hasSLLConflictTerminatingPrediction = function (mode, configs) {
	    // Configs in rule stop states indicate reaching the end of the decision
	    // rule (local context) or end of start rule (full context). If all
	    // configs meet this condition, then none of the configurations is able
	    // to match additional input so we terminate prediction.
	    //
	    if (PredictionMode.allConfigsInRuleStopStates(configs)) {
	        return true;
	    }
	    // pure SLL mode parsing
	    if (mode === PredictionMode.SLL) {
	        // Don't bother with combining configs from different semantic
	        // contexts if we can fail over to full LL; costs more time
	        // since we'll often fail over anyway.
	        if (configs.hasSemanticContext) {
	            // dup configs, tossing out semantic predicates
	            var dup = new ATNConfigSet();
	            for (var i = 0; i < configs.items.length; i++) {
	                var c = configs.items[i];
	                c = new ATNConfig({ semanticContext: SemanticContext.NONE }, c);
	                dup.add(c);
	            }
	            configs = dup;
	        }
	        // now we have combined contexts for configs with dissimilar preds
	    }
	    // pure SLL or combined SLL+LL mode parsing
	    var altsets = PredictionMode.getConflictingAltSubsets(configs);
	    return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
	};

	// Checks if any configuration in {@code configs} is in a
	// {@link RuleStopState}. Configurations meeting this condition have reached
	// the end of the decision rule (local context) or end of start rule (full
	// context).
	//
	// @param configs the configuration set to test
	// @return {@code true} if any configuration in {@code configs} is in a
	// {@link RuleStopState}, otherwise {@code false}
	PredictionMode.hasConfigInRuleStopState = function (configs) {
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (c.state instanceof RuleStopState) {
	            return true;
	        }
	    }
	    return false;
	};

	// Checks if all configurations in {@code configs} are in a
	// {@link RuleStopState}. Configurations meeting this condition have reached
	// the end of the decision rule (local context) or end of start rule (full
	// context).
	//
	// @param configs the configuration set to test
	// @return {@code true} if all configurations in {@code configs} are in a
	// {@link RuleStopState}, otherwise {@code false}
	PredictionMode.allConfigsInRuleStopStates = function (configs) {
	    for (var i = 0; i < configs.items.length; i++) {
	        var c = configs.items[i];
	        if (!(c.state instanceof RuleStopState)) {
	            return false;
	        }
	    }
	    return true;
	};

	//
	// Full LL prediction termination.
	//
	// <p>Can we stop looking ahead during ATN simulation or is there some
	// uncertainty as to which alternative we will ultimately pick, after
	// consuming more input? Even if there are partial conflicts, we might know
	// that everything is going to resolve to the same minimum alternative. That
	// means we can stop since no more lookahead will change that fact. On the
	// other hand, there might be multiple conflicts that resolve to different
	// minimums. That means we need more look ahead to decide which of those
	// alternatives we should predict.</p>
	//
	// <p>The basic idea is to split the set of configurations {@code C}, into
	// conflicting subsets {@code (s, _, ctx, _)} and singleton subsets with
	// non-conflicting configurations. Two configurations conflict if they have
	// identical {@link ATNConfig//state} and {@link ATNConfig//context} values
	// but different {@link ATNConfig//alt} value, e.g. {@code (s, i, ctx, _)}
	// and {@code (s, j, ctx, _)} for {@code i!=j}.</p>
	//
	// <p>Reduce these configuration subsets to the set of possible alternatives.
	// You can compute the alternative subsets in one pass as follows:</p>
	//
	// <p>{@code A_s,ctx = {i | (s, i, ctx, _)}} for each configuration in
	// {@code C} holding {@code s} and {@code ctx} fixed.</p>
	//
	// <p>Or in pseudo-code, for each configuration {@code c} in {@code C}:</p>
	//
	// <pre>
	// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
	// alt and not pred
	// </pre>
	//
	// <p>The values in {@code map} are the set of {@code A_s,ctx} sets.</p>
	//
	// <p>If {@code |A_s,ctx|=1} then there is no conflict associated with
	// {@code s} and {@code ctx}.</p>
	//
	// <p>Reduce the subsets to singletons by choosing a minimum of each subset. If
	// the union of these alternative subsets is a singleton, then no amount of
	// more lookahead will help us. We will always pick that alternative. If,
	// however, there is more than one alternative, then we are uncertain which
	// alternative to predict and must continue looking for resolution. We may
	// or may not discover an ambiguity in the future, even if there are no
	// conflicting subsets this round.</p>
	//
	// <p>The biggest sin is to terminate early because it means we've made a
	// decision but were uncertain as to the eventual outcome. We haven't used
	// enough lookahead. On the other hand, announcing a conflict too late is no
	// big deal; you will still have the conflict. It's just inefficient. It
	// might even look until the end of file.</p>
	//
	// <p>No special consideration for semantic predicates is required because
	// predicates are evaluated on-the-fly for full LL prediction, ensuring that
	// no configuration contains a semantic context during the termination
	// check.</p>
	//
	// <p><strong>CONFLICTING CONFIGS</strong></p>
	//
	// <p>Two configurations {@code (s, i, x)} and {@code (s, j, x')}, conflict
	// when {@code i!=j} but {@code x=x'}. Because we merge all
	// {@code (s, i, _)} configurations together, that means that there are at
	// most {@code n} configurations associated with state {@code s} for
	// {@code n} possible alternatives in the decision. The merged stacks
	// complicate the comparison of configuration contexts {@code x} and
	// {@code x'}. Sam checks to see if one is a subset of the other by calling
	// merge and checking to see if the merged result is either {@code x} or
	// {@code x'}. If the {@code x} associated with lowest alternative {@code i}
	// is the superset, then {@code i} is the only possible prediction since the
	// others resolve to {@code min(i)} as well. However, if {@code x} is
	// associated with {@code j>i} then at least one stack configuration for
	// {@code j} is not in conflict with alternative {@code i}. The algorithm
	// should keep going, looking for more lookahead due to the uncertainty.</p>
	//
	// <p>For simplicity, I'm doing a equality check between {@code x} and
	// {@code x'} that lets the algorithm continue to consume lookahead longer
	// than necessary. The reason I like the equality is of course the
	// simplicity but also because that is the test you need to detect the
	// alternatives that are actually in conflict.</p>
	//
	// <p><strong>CONTINUE/STOP RULE</strong></p>
	//
	// <p>Continue if union of resolved alternative sets from non-conflicting and
	// conflicting alternative subsets has more than one alternative. We are
	// uncertain about which alternative to predict.</p>
	//
	// <p>The complete set of alternatives, {@code [i for (_,i,_)]}, tells us which
	// alternatives are still in the running for the amount of input we've
	// consumed at this point. The conflicting sets let us to strip away
	// configurations that won't lead to more states because we resolve
	// conflicts to the configuration with a minimum alternate for the
	// conflicting set.</p>
	//
	// <p><strong>CASES</strong></p>
	//
	// <ul>
	//
	// <li>no conflicts and more than 1 alternative in set =&gt; continue</li>
	//
	// <li> {@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s, 3, z)},
	// {@code (s', 1, y)}, {@code (s', 2, y)} yields non-conflicting set
	// {@code {3}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
	// {@code {1,3}} =&gt; continue
	// </li>
	//
	// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
	// {@code (s', 2, y)}, {@code (s'', 1, z)} yields non-conflicting set
	// {@code {1}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
	// {@code {1}} =&gt; stop and predict 1</li>
	//
	// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
	// {@code (s', 2, y)} yields conflicting, reduced sets {@code {1}} U
	// {@code {1}} = {@code {1}} =&gt; stop and predict 1, can announce
	// ambiguity {@code {1,2}}</li>
	//
	// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 2, y)},
	// {@code (s', 3, y)} yields conflicting, reduced sets {@code {1}} U
	// {@code {2}} = {@code {1,2}} =&gt; continue</li>
	//
	// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 3, y)},
	// {@code (s', 4, y)} yields conflicting, reduced sets {@code {1}} U
	// {@code {3}} = {@code {1,3}} =&gt; continue</li>
	//
	// </ul>
	//
	// <p><strong>EXACT AMBIGUITY DETECTION</strong></p>
	//
	// <p>If all states report the same conflicting set of alternatives, then we
	// know we have the exact ambiguity set.</p>
	//
	// <p><code>|A_<em>i</em>|&gt;1</code> and
	// <code>A_<em>i</em> = A_<em>j</em></code> for all <em>i</em>, <em>j</em>.</p>
	//
	// <p>In other words, we continue examining lookahead until all {@code A_i}
	// have more than one alternative and all {@code A_i} are the same. If
	// {@code A={{1,2}, {1,3}}}, then regular LL prediction would terminate
	// because the resolved set is {@code {1}}. To determine what the real
	// ambiguity is, we have to know whether the ambiguity is between one and
	// two or one and three so we keep going. We can only stop prediction when
	// we need exact ambiguity detection when the sets look like
	// {@code A={{1,2}}} or {@code {{1,2},{1,2}}}, etc...</p>
	//
	PredictionMode.resolvesToJustOneViableAlt = function (altsets) {
	    return PredictionMode.getSingleViableAlt(altsets);
	};

	//
	// Determines if every alternative subset in {@code altsets} contains more
	// than one alternative.
	//
	// @param altsets a collection of alternative subsets
	// @return {@code true} if every {@link BitSet} in {@code altsets} has
	// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
	//
	PredictionMode.allSubsetsConflict = function (altsets) {
	    return !PredictionMode.hasNonConflictingAltSet(altsets);
	};
	//
	// Determines if any single alternative subset in {@code altsets} contains
	// exactly one alternative.
	//
	// @param altsets a collection of alternative subsets
	// @return {@code true} if {@code altsets} contains a {@link BitSet} with
	// {@link BitSet//cardinality cardinality} 1, otherwise {@code false}
	//
	PredictionMode.hasNonConflictingAltSet = function (altsets) {
	    for (var i = 0; i < altsets.length; i++) {
	        var alts = altsets[i];
	        if (alts.length === 1) {
	            return true;
	        }
	    }
	    return false;
	};

	//
	// Determines if any single alternative subset in {@code altsets} contains
	// more than one alternative.
	//
	// @param altsets a collection of alternative subsets
	// @return {@code true} if {@code altsets} contains a {@link BitSet} with
	// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
	//
	PredictionMode.hasConflictingAltSet = function (altsets) {
	    for (var i = 0; i < altsets.length; i++) {
	        var alts = altsets[i];
	        if (alts.length > 1) {
	            return true;
	        }
	    }
	    return false;
	};

	//
	// Determines if every alternative subset in {@code altsets} is equivalent.
	//
	// @param altsets a collection of alternative subsets
	// @return {@code true} if every member of {@code altsets} is equal to the
	// others, otherwise {@code false}
	//
	PredictionMode.allSubsetsEqual = function (altsets) {
	    var first = null;
	    for (var i = 0; i < altsets.length; i++) {
	        var alts = altsets[i];
	        if (first === null) {
	            first = alts;
	        } else if (alts !== first) {
	            return false;
	        }
	    }
	    return true;
	};

	//
	// Returns the unique alternative predicted by all alternative subsets in
	// {@code altsets}. If no such alternative exists, this method returns
	// {@link ATN//INVALID_ALT_NUMBER}.
	//
	// @param altsets a collection of alternative subsets
	//
	PredictionMode.getUniqueAlt = function (altsets) {
	    var all = PredictionMode.getAlts(altsets);
	    if (all.length === 1) {
	        return all.minValue();
	    } else {
	        return ATN.INVALID_ALT_NUMBER;
	    }
	};

	// Gets the complete set of represented alternatives for a collection of
	// alternative subsets. This method returns the union of each {@link BitSet}
	// in {@code altsets}.
	//
	// @param altsets a collection of alternative subsets
	// @return the set of represented alternatives in {@code altsets}
	//
	PredictionMode.getAlts = function (altsets) {
	    var all = new BitSet();
	    altsets.map(function (alts) {
	        all.or(alts);
	    });
	    return all;
	};

	//
	// This function gets the conflicting alt subsets from a configuration set.
	// For each configuration {@code c} in {@code configs}:
	//
	// <pre>
	// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
	// alt and not pred
	// </pre>

	PredictionMode.getConflictingAltSubsets = function (configs) {
	    var configToAlts = new Map();
	    configToAlts.hashFunction = function (cfg) {
	        hashStuff(cfg.state.stateNumber, cfg.context);
	    };
	    configToAlts.equalsFunction = function (c1, c2) {
	        return c1.state.stateNumber == c2.state.stateNumber && c1.context.equals(c2.context);
	    };
	    configs.items.map(function (cfg) {
	        var alts = configToAlts.get(cfg);
	        if (alts === null) {
	            alts = new BitSet();
	            configToAlts.put(cfg, alts);
	        }
	        alts.add(cfg.alt);
	    });
	    return configToAlts.getValues();
	};

	//
	// Get a map from state to alt subset from a configuration set. For each
	// configuration {@code c} in {@code configs}:
	//
	// <pre>
	// map[c.{@link ATNConfig//state state}] U= c.{@link ATNConfig//alt alt}
	// </pre>
	//
	PredictionMode.getStateToAltMap = function (configs) {
	    var m = new AltDict();
	    configs.items.map(function (c) {
	        var alts = m.get(c.state);
	        if (alts === null) {
	            alts = new BitSet();
	            m.put(c.state, alts);
	        }
	        alts.add(c.alt);
	    });
	    return m;
	};

	PredictionMode.hasStateAssociatedWithOneAlt = function (configs) {
	    var values = PredictionMode.getStateToAltMap(configs).values();
	    for (var i = 0; i < values.length; i++) {
	        if (values[i].length === 1) {
	            return true;
	        }
	    }
	    return false;
	};

	PredictionMode.getSingleViableAlt = function (altsets) {
	    var result = null;
	    for (var i = 0; i < altsets.length; i++) {
	        var alts = altsets[i];
	        var minAlt = alts.minValue();
	        if (result === null) {
	            result = minAlt;
	        } else if (result !== minAlt) {
	            // more than 1 viable alt
	            return ATN.INVALID_ALT_NUMBER;
	        }
	    }
	    return result;
	};

	exports.PredictionMode = PredictionMode;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	exports.DFA = __webpack_require__(34).DFA;
	exports.DFASerializer = __webpack_require__(35).DFASerializer;
	exports.LexerDFASerializer = __webpack_require__(35).LexerDFASerializer;
	exports.PredPrediction = __webpack_require__(28).PredPrediction;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var Set = __webpack_require__(5).Set;
	var DFAState = __webpack_require__(28).DFAState;
	var StarLoopEntryState = __webpack_require__(8).StarLoopEntryState;
	var ATNConfigSet = __webpack_require__(29).ATNConfigSet;
	var DFASerializer = __webpack_require__(35).DFASerializer;
	var LexerDFASerializer = __webpack_require__(35).LexerDFASerializer;

	function DFA(atnStartState, decision) {
		if (decision === undefined) {
			decision = 0;
		}
		// From which ATN state did we create this DFA?
		this.atnStartState = atnStartState;
		this.decision = decision;
		// A set of all DFA states. Use {@link Map} so we can get old state back
		// ({@link Set} only allows you to see if it's there).
		this._states = new Set();
		this.s0 = null;
		// {@code true} if this DFA is for a precedence decision; otherwise,
		// {@code false}. This is the backing field for {@link //isPrecedenceDfa},
		// {@link //setPrecedenceDfa}.
		this.precedenceDfa = false;
		if (atnStartState instanceof StarLoopEntryState) {
			if (atnStartState.isPrecedenceDecision) {
				this.precedenceDfa = true;
				precedenceState = new DFAState(null, new ATNConfigSet());
				precedenceState.edges = [];
				precedenceState.isAcceptState = false;
				precedenceState.requiresFullContext = false;
				this.s0 = precedenceState;
			}
		}
		return this;
	}

	// Get the start state for a specific precedence value.
	//
	// @param precedence The current precedence.
	// @return The start state corresponding to the specified precedence, or
	// {@code null} if no start state exists for the specified precedence.
	//
	// @throws IllegalStateException if this is not a precedence DFA.
	// @see //isPrecedenceDfa()

	DFA.prototype.getPrecedenceStartState = function (precedence) {
		if (!this.precedenceDfa) {
			throw "Only precedence DFAs may contain a precedence start state.";
		}
		// s0.edges is never null for a precedence DFA
		if (precedence < 0 || precedence >= this.s0.edges.length) {
			return null;
		}
		return this.s0.edges[precedence] || null;
	};

	// Set the start state for a specific precedence value.
	//
	// @param precedence The current precedence.
	// @param startState The start state corresponding to the specified
	// precedence.
	//
	// @throws IllegalStateException if this is not a precedence DFA.
	// @see //isPrecedenceDfa()
	//
	DFA.prototype.setPrecedenceStartState = function (precedence, startState) {
		if (!this.precedenceDfa) {
			throw "Only precedence DFAs may contain a precedence start state.";
		}
		if (precedence < 0) {
			return;
		}

		// synchronization on s0 here is ok. when the DFA is turned into a
		// precedence DFA, s0 will be initialized once and not updated again
		// s0.edges is never null for a precedence DFA
		this.s0.edges[precedence] = startState;
	};

	//
	// Sets whether this is a precedence DFA. If the specified value differs
	// from the current DFA configuration, the following actions are taken;
	// otherwise no changes are made to the current DFA.
	//
	// <ul>
	// <li>The {@link //states} map is cleared</li>
	// <li>If {@code precedenceDfa} is {@code false}, the initial state
	// {@link //s0} is set to {@code null}; otherwise, it is initialized to a new
	// {@link DFAState} with an empty outgoing {@link DFAState//edges} array to
	// store the start states for individual precedence values.</li>
	// <li>The {@link //precedenceDfa} field is updated</li>
	// </ul>
	//
	// @param precedenceDfa {@code true} if this is a precedence DFA; otherwise,
	// {@code false}

	DFA.prototype.setPrecedenceDfa = function (precedenceDfa) {
		if (this.precedenceDfa !== precedenceDfa) {
			this._states = new DFAStatesSet();
			if (precedenceDfa) {
				var precedenceState = new DFAState(null, new ATNConfigSet());
				precedenceState.edges = [];
				precedenceState.isAcceptState = false;
				precedenceState.requiresFullContext = false;
				this.s0 = precedenceState;
			} else {
				this.s0 = null;
			}
			this.precedenceDfa = precedenceDfa;
		}
	};

	Object.defineProperty(DFA.prototype, "states", {
		get: function get() {
			return this._states;
		}
	});

	// Return a list of all states in this DFA, ordered by state number.
	DFA.prototype.sortedStates = function () {
		var list = this._states.values();
		return list.sort(function (a, b) {
			return a.stateNumber - b.stateNumber;
		});
	};

	DFA.prototype.toString = function (literalNames, symbolicNames) {
		literalNames = literalNames || null;
		symbolicNames = symbolicNames || null;
		if (this.s0 === null) {
			return "";
		}
		var serializer = new DFASerializer(this, literalNames, symbolicNames);
		return serializer.toString();
	};

	DFA.prototype.toLexerString = function () {
		if (this.s0 === null) {
			return "";
		}
		var serializer = new LexerDFASerializer(this);
		return serializer.toString();
	};

	exports.DFA = DFA;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	// A DFA walker that knows how to dump them to serialized strings.#/


	function DFASerializer(dfa, literalNames, symbolicNames) {
	    this.dfa = dfa;
	    this.literalNames = literalNames || [];
	    this.symbolicNames = symbolicNames || [];
	    return this;
	}

	DFASerializer.prototype.toString = function () {
	    if (this.dfa.s0 === null) {
	        return null;
	    }
	    var buf = "";
	    var states = this.dfa.sortedStates();
	    for (var i = 0; i < states.length; i++) {
	        var s = states[i];
	        if (s.edges !== null) {
	            var n = s.edges.length;
	            for (var j = 0; j < n; j++) {
	                var t = s.edges[j] || null;
	                if (t !== null && t.stateNumber !== 0x7FFFFFFF) {
	                    buf = buf.concat(this.getStateString(s));
	                    buf = buf.concat("-");
	                    buf = buf.concat(this.getEdgeLabel(j));
	                    buf = buf.concat("->");
	                    buf = buf.concat(this.getStateString(t));
	                    buf = buf.concat('\n');
	                }
	            }
	        }
	    }
	    return buf.length === 0 ? null : buf;
	};

	DFASerializer.prototype.getEdgeLabel = function (i) {
	    if (i === 0) {
	        return "EOF";
	    } else if (this.literalNames !== null || this.symbolicNames !== null) {
	        return this.literalNames[i - 1] || this.symbolicNames[i - 1];
	    } else {
	        return String.fromCharCode(i - 1);
	    }
	};

	DFASerializer.prototype.getStateString = function (s) {
	    var baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");
	    if (s.isAcceptState) {
	        if (s.predicates !== null) {
	            return baseStateStr + "=>" + s.predicates.toString();
	        } else {
	            return baseStateStr + "=>" + s.prediction.toString();
	        }
	    } else {
	        return baseStateStr;
	    }
	};

	function LexerDFASerializer(dfa) {
	    DFASerializer.call(this, dfa, null);
	    return this;
	}

	LexerDFASerializer.prototype = Object.create(DFASerializer.prototype);
	LexerDFASerializer.prototype.constructor = LexerDFASerializer;

	LexerDFASerializer.prototype.getEdgeLabel = function (i) {
	    return "'" + String.fromCharCode(i) + "'";
	};

	exports.DFASerializer = DFASerializer;
	exports.LexerDFASerializer = LexerDFASerializer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var Tree = __webpack_require__(14);
	exports.Trees = __webpack_require__(15).Trees;
	exports.RuleNode = Tree.RuleNode;
	exports.ParseTreeListener = Tree.ParseTreeListener;
	exports.ParseTreeVisitor = Tree.ParseTreeVisitor;
	exports.ParseTreeWalker = Tree.ParseTreeWalker;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	exports.RecognitionException = __webpack_require__(26).RecognitionException;
	exports.NoViableAltException = __webpack_require__(26).NoViableAltException;
	exports.LexerNoViableAltException = __webpack_require__(26).LexerNoViableAltException;
	exports.InputMismatchException = __webpack_require__(26).InputMismatchException;
	exports.FailedPredicateException = __webpack_require__(26).FailedPredicateException;
	exports.DiagnosticErrorListener = __webpack_require__(38).DiagnosticErrorListener;
	exports.BailErrorStrategy = __webpack_require__(39).BailErrorStrategy;
	exports.ErrorListener = __webpack_require__(24).ErrorListener;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	//
	// This implementation of {@link ANTLRErrorListener} can be used to identify
	// certain potential correctness and performance problems in grammars. "Reports"
	// are made by calling {@link Parser//notifyErrorListeners} with the appropriate
	// message.
	//
	// <ul>
	// <li><b>Ambiguities</b>: These are cases where more than one path through the
	// grammar can match the input.</li>
	// <li><b>Weak context sensitivity</b>: These are cases where full-context
	// prediction resolved an SLL conflict to a unique alternative which equaled the
	// minimum alternative of the SLL conflict.</li>
	// <li><b>Strong (forced) context sensitivity</b>: These are cases where the
	// full-context prediction resolved an SLL conflict to a unique alternative,
	// <em>and</em> the minimum alternative of the SLL conflict was found to not be
	// a truly viable alternative. Two-stage parsing cannot be used for inputs where
	// this situation occurs.</li>
	// </ul>

	var BitSet = __webpack_require__(5).BitSet;
	var ErrorListener = __webpack_require__(24).ErrorListener;
	var Interval = __webpack_require__(10).Interval;

	function DiagnosticErrorListener(exactOnly) {
		ErrorListener.call(this);
		exactOnly = exactOnly || true;
		// whether all ambiguities or only exact ambiguities are reported.
		this.exactOnly = exactOnly;
		return this;
	}

	DiagnosticErrorListener.prototype = Object.create(ErrorListener.prototype);
	DiagnosticErrorListener.prototype.constructor = DiagnosticErrorListener;

	DiagnosticErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
		if (this.exactOnly && !exact) {
			return;
		}
		var msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
		recognizer.notifyErrorListeners(msg);
	};

	DiagnosticErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
		var msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
		recognizer.notifyErrorListeners(msg);
	};

	DiagnosticErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
		var msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
		recognizer.notifyErrorListeners(msg);
	};

	DiagnosticErrorListener.prototype.getDecisionDescription = function (recognizer, dfa) {
		var decision = dfa.decision;
		var ruleIndex = dfa.atnStartState.ruleIndex;

		var ruleNames = recognizer.ruleNames;
		if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
			return "" + decision;
		}
		var ruleName = ruleNames[ruleIndex] || null;
		if (ruleName === null || ruleName.length === 0) {
			return "" + decision;
		}
		return "" + decision + " (" + ruleName + ")";
	};

	//
	// Computes the set of conflicting or ambiguous alternatives from a
	// configuration set, if that information was not already provided by the
	// parser.
	//
	// @param reportedAlts The set of conflicting or ambiguous alternatives, as
	// reported by the parser.
	// @param configs The conflicting or ambiguous configuration set.
	// @return Returns {@code reportedAlts} if it is not {@code null}, otherwise
	// returns the set of alternatives represented in {@code configs}.
	//
	DiagnosticErrorListener.prototype.getConflictingAlts = function (reportedAlts, configs) {
		if (reportedAlts !== null) {
			return reportedAlts;
		}
		var result = new BitSet();
		for (var i = 0; i < configs.items.length; i++) {
			result.add(configs.items[i].alt);
		}
		return "{" + result.values().join(", ") + "}";
	};

	exports.DiagnosticErrorListener = DiagnosticErrorListener;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	var Token = __webpack_require__(6).Token;
	var Errors = __webpack_require__(26);
	var NoViableAltException = Errors.NoViableAltException;
	var InputMismatchException = Errors.InputMismatchException;
	var FailedPredicateException = Errors.FailedPredicateException;
	var ParseCancellationException = Errors.ParseCancellationException;
	var ATNState = __webpack_require__(8).ATNState;
	var Interval = __webpack_require__(10).Interval;
	var IntervalSet = __webpack_require__(10).IntervalSet;

	function ErrorStrategy() {}

	ErrorStrategy.prototype.reset = function (recognizer) {};

	ErrorStrategy.prototype.recoverInline = function (recognizer) {};

	ErrorStrategy.prototype.recover = function (recognizer, e) {};

	ErrorStrategy.prototype.sync = function (recognizer) {};

	ErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {};

	ErrorStrategy.prototype.reportError = function (recognizer) {};

	// This is the default implementation of {@link ANTLRErrorStrategy} used for
	// error reporting and recovery in ANTLR parsers.
	//
	function DefaultErrorStrategy() {
	    ErrorStrategy.call(this);
	    // Indicates whether the error strategy is currently "recovering from an
	    // error". This is used to suppress reporting multiple error messages while
	    // attempting to recover from a detected syntax error.
	    //
	    // @see //inErrorRecoveryMode
	    //
	    this.errorRecoveryMode = false;

	    // The index into the input stream where the last error occurred.
	    // This is used to prevent infinite loops where an error is found
	    // but no token is consumed during recovery...another error is found,
	    // ad nauseum. This is a failsafe mechanism to guarantee that at least
	    // one token/tree node is consumed for two errors.
	    //
	    this.lastErrorIndex = -1;
	    this.lastErrorStates = null;
	    return this;
	}

	DefaultErrorStrategy.prototype = Object.create(ErrorStrategy.prototype);
	DefaultErrorStrategy.prototype.constructor = DefaultErrorStrategy;

	// <p>The default implementation simply calls {@link //endErrorCondition} to
	// ensure that the handler is not in error recovery mode.</p>
	DefaultErrorStrategy.prototype.reset = function (recognizer) {
	    this.endErrorCondition(recognizer);
	};

	//
	// This method is called to enter error recovery mode when a recognition
	// exception is reported.
	//
	// @param recognizer the parser instance
	//
	DefaultErrorStrategy.prototype.beginErrorCondition = function (recognizer) {
	    this.errorRecoveryMode = true;
	};

	DefaultErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {
	    return this.errorRecoveryMode;
	};

	//
	// This method is called to leave error recovery mode after recovering from
	// a recognition exception.
	//
	// @param recognizer
	//
	DefaultErrorStrategy.prototype.endErrorCondition = function (recognizer) {
	    this.errorRecoveryMode = false;
	    this.lastErrorStates = null;
	    this.lastErrorIndex = -1;
	};

	//
	// {@inheritDoc}
	//
	// <p>The default implementation simply calls {@link //endErrorCondition}.</p>
	//
	DefaultErrorStrategy.prototype.reportMatch = function (recognizer) {
	    this.endErrorCondition(recognizer);
	};

	//
	// {@inheritDoc}
	//
	// <p>The default implementation returns immediately if the handler is already
	// in error recovery mode. Otherwise, it calls {@link //beginErrorCondition}
	// and dispatches the reporting task based on the runtime type of {@code e}
	// according to the following table.</p>
	//
	// <ul>
	// <li>{@link NoViableAltException}: Dispatches the call to
	// {@link //reportNoViableAlternative}</li>
	// <li>{@link InputMismatchException}: Dispatches the call to
	// {@link //reportInputMismatch}</li>
	// <li>{@link FailedPredicateException}: Dispatches the call to
	// {@link //reportFailedPredicate}</li>
	// <li>All other types: calls {@link Parser//notifyErrorListeners} to report
	// the exception</li>
	// </ul>
	//
	DefaultErrorStrategy.prototype.reportError = function (recognizer, e) {
	    // if we've already reported an error and have not matched a token
	    // yet successfully, don't report any errors.
	    if (this.inErrorRecoveryMode(recognizer)) {
	        return; // don't report spurious errors
	    }
	    this.beginErrorCondition(recognizer);
	    if (e instanceof NoViableAltException) {
	        this.reportNoViableAlternative(recognizer, e);
	    } else if (e instanceof InputMismatchException) {
	        this.reportInputMismatch(recognizer, e);
	    } else if (e instanceof FailedPredicateException) {
	        this.reportFailedPredicate(recognizer, e);
	    } else {
	        console.log("unknown recognition error type: " + e.constructor.name);
	        console.log(e.stack);
	        recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
	    }
	};
	//
	// {@inheritDoc}
	//
	// <p>The default implementation resynchronizes the parser by consuming tokens
	// until we find one in the resynchronization set--loosely the set of tokens
	// that can follow the current rule.</p>
	//
	DefaultErrorStrategy.prototype.recover = function (recognizer, e) {
	    if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
	        // uh oh, another error at same token index and previously-visited
	        // state in ATN; must be a case where LT(1) is in the recovery
	        // token set so nothing got consumed. Consume a single token
	        // at least to prevent an infinite loop; this is a failsafe.
	        recognizer.consume();
	    }
	    this.lastErrorIndex = recognizer._input.index;
	    if (this.lastErrorStates === null) {
	        this.lastErrorStates = [];
	    }
	    this.lastErrorStates.push(recognizer.state);
	    var followSet = this.getErrorRecoverySet(recognizer);
	    this.consumeUntil(recognizer, followSet);
	};

	// The default implementation of {@link ANTLRErrorStrategy//sync} makes sure
	// that the current lookahead symbol is consistent with what were expecting
	// at this point in the ATN. You can call this anytime but ANTLR only
	// generates code to check before subrules/loops and each iteration.
	//
	// <p>Implements Jim Idle's magic sync mechanism in closures and optional
	// subrules. E.g.,</p>
	//
	// <pre>
	// a : sync ( stuff sync )* ;
	// sync : {consume to what can follow sync} ;
	// </pre>
	//
	// At the start of a sub rule upon error, {@link //sync} performs single
	// token deletion, if possible. If it can't do that, it bails on the current
	// rule and uses the default error recovery, which consumes until the
	// resynchronization set of the current rule.
	//
	// <p>If the sub rule is optional ({@code (...)?}, {@code (...)*}, or block
	// with an empty alternative), then the expected set includes what follows
	// the subrule.</p>
	//
	// <p>During loop iteration, it consumes until it sees a token that can start a
	// sub rule or what follows loop. Yes, that is pretty aggressive. We opt to
	// stay in the loop as long as possible.</p>
	//
	// <p><strong>ORIGINS</strong></p>
	//
	// <p>Previous versions of ANTLR did a poor job of their recovery within loops.
	// A single mismatch token or missing token would force the parser to bail
	// out of the entire rules surrounding the loop. So, for rule</p>
	//
	// <pre>
	// classDef : 'class' ID '{' member* '}'
	// </pre>
	//
	// input with an extra token between members would force the parser to
	// consume until it found the next class definition rather than the next
	// member definition of the current class.
	//
	// <p>This functionality cost a little bit of effort because the parser has to
	// compare token set at the start of the loop and at each iteration. If for
	// some reason speed is suffering for you, you can turn off this
	// functionality by simply overriding this method as a blank { }.</p>
	//
	DefaultErrorStrategy.prototype.sync = function (recognizer) {
	    // If already recovering, don't try to sync
	    if (this.inErrorRecoveryMode(recognizer)) {
	        return;
	    }
	    var s = recognizer._interp.atn.states[recognizer.state];
	    var la = recognizer.getTokenStream().LA(1);
	    // try cheaper subset first; might get lucky. seems to shave a wee bit off
	    if (la === Token.EOF || recognizer.atn.nextTokens(s).contains(la)) {
	        return;
	    }
	    // Return but don't end recovery. only do that upon valid token match
	    if (recognizer.isExpectedToken(la)) {
	        return;
	    }
	    switch (s.stateType) {
	        case ATNState.BLOCK_START:
	        case ATNState.STAR_BLOCK_START:
	        case ATNState.PLUS_BLOCK_START:
	        case ATNState.STAR_LOOP_ENTRY:
	            // report error and recover if possible
	            if (this.singleTokenDeletion(recognizer) !== null) {
	                return;
	            } else {
	                throw new InputMismatchException(recognizer);
	            }
	            break;
	        case ATNState.PLUS_LOOP_BACK:
	        case ATNState.STAR_LOOP_BACK:
	            this.reportUnwantedToken(recognizer);
	            var expecting = new IntervalSet();
	            expecting.addSet(recognizer.getExpectedTokens());
	            var whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
	            this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
	            break;
	        default:
	        // do nothing if we can't identify the exact kind of ATN state
	    }
	};

	// This is called by {@link //reportError} when the exception is a
	// {@link NoViableAltException}.
	//
	// @see //reportError
	//
	// @param recognizer the parser instance
	// @param e the recognition exception
	//
	DefaultErrorStrategy.prototype.reportNoViableAlternative = function (recognizer, e) {
	    var tokens = recognizer.getTokenStream();
	    var input;
	    if (tokens !== null) {
	        if (e.startToken.type === Token.EOF) {
	            input = "<EOF>";
	        } else {
	            input = tokens.getText(new Interval(e.startToken, e.offendingToken));
	        }
	    } else {
	        input = "<unknown input>";
	    }
	    var msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
	    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	};

	//
	// This is called by {@link //reportError} when the exception is an
	// {@link InputMismatchException}.
	//
	// @see //reportError
	//
	// @param recognizer the parser instance
	// @param e the recognition exception
	//
	DefaultErrorStrategy.prototype.reportInputMismatch = function (recognizer, e) {
	    var msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
	    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	};

	//
	// This is called by {@link //reportError} when the exception is a
	// {@link FailedPredicateException}.
	//
	// @see //reportError
	//
	// @param recognizer the parser instance
	// @param e the recognition exception
	//
	DefaultErrorStrategy.prototype.reportFailedPredicate = function (recognizer, e) {
	    var ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
	    var msg = "rule " + ruleName + " " + e.message;
	    recognizer.notifyErrorListeners(msg, e.offendingToken, e);
	};

	// This method is called to report a syntax error which requires the removal
	// of a token from the input stream. At the time this method is called, the
	// erroneous symbol is current {@code LT(1)} symbol and has not yet been
	// removed from the input stream. When this method returns,
	// {@code recognizer} is in error recovery mode.
	//
	// <p>This method is called when {@link //singleTokenDeletion} identifies
	// single-token deletion as a viable recovery strategy for a mismatched
	// input error.</p>
	//
	// <p>The default implementation simply returns if the handler is already in
	// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
	// enter error recovery mode, followed by calling
	// {@link Parser//notifyErrorListeners}.</p>
	//
	// @param recognizer the parser instance
	//
	DefaultErrorStrategy.prototype.reportUnwantedToken = function (recognizer) {
	    if (this.inErrorRecoveryMode(recognizer)) {
	        return;
	    }
	    this.beginErrorCondition(recognizer);
	    var t = recognizer.getCurrentToken();
	    var tokenName = this.getTokenErrorDisplay(t);
	    var expecting = this.getExpectedTokens(recognizer);
	    var msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
	    recognizer.notifyErrorListeners(msg, t, null);
	};
	// This method is called to report a syntax error which requires the
	// insertion of a missing token into the input stream. At the time this
	// method is called, the missing token has not yet been inserted. When this
	// method returns, {@code recognizer} is in error recovery mode.
	//
	// <p>This method is called when {@link //singleTokenInsertion} identifies
	// single-token insertion as a viable recovery strategy for a mismatched
	// input error.</p>
	//
	// <p>The default implementation simply returns if the handler is already in
	// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
	// enter error recovery mode, followed by calling
	// {@link Parser//notifyErrorListeners}.</p>
	//
	// @param recognizer the parser instance
	//
	DefaultErrorStrategy.prototype.reportMissingToken = function (recognizer) {
	    if (this.inErrorRecoveryMode(recognizer)) {
	        return;
	    }
	    this.beginErrorCondition(recognizer);
	    var t = recognizer.getCurrentToken();
	    var expecting = this.getExpectedTokens(recognizer);
	    var msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
	    recognizer.notifyErrorListeners(msg, t, null);
	};

	// <p>The default implementation attempts to recover from the mismatched input
	// by using single token insertion and deletion as described below. If the
	// recovery attempt fails, this method throws an
	// {@link InputMismatchException}.</p>
	//
	// <p><strong>EXTRA TOKEN</strong> (single token deletion)</p>
	//
	// <p>{@code LA(1)} is not what we are looking for. If {@code LA(2)} has the
	// right token, however, then assume {@code LA(1)} is some extra spurious
	// token and delete it. Then consume and return the next token (which was
	// the {@code LA(2)} token) as the successful result of the match operation.</p>
	//
	// <p>This recovery strategy is implemented by {@link
	// //singleTokenDeletion}.</p>
	//
	// <p><strong>MISSING TOKEN</strong> (single token insertion)</p>
	//
	// <p>If current token (at {@code LA(1)}) is consistent with what could come
	// after the expected {@code LA(1)} token, then assume the token is missing
	// and use the parser's {@link TokenFactory} to create it on the fly. The
	// "insertion" is performed by returning the created token as the successful
	// result of the match operation.</p>
	//
	// <p>This recovery strategy is implemented by {@link
	// //singleTokenInsertion}.</p>
	//
	// <p><strong>EXAMPLE</strong></p>
	//
	// <p>For example, Input {@code i=(3;} is clearly missing the {@code ')'}. When
	// the parser returns from the nested call to {@code expr}, it will have
	// call chain:</p>
	//
	// <pre>
	// stat &rarr; expr &rarr; atom
	// </pre>
	//
	// and it will be trying to match the {@code ')'} at this point in the
	// derivation:
	//
	// <pre>
	// =&gt; ID '=' '(' INT ')' ('+' atom)* ';'
	// ^
	// </pre>
	//
	// The attempt to match {@code ')'} will fail when it sees {@code ';'} and
	// call {@link //recoverInline}. To recover, it sees that {@code LA(1)==';'}
	// is in the set of tokens that can follow the {@code ')'} token reference
	// in rule {@code atom}. It can assume that you forgot the {@code ')'}.
	//
	DefaultErrorStrategy.prototype.recoverInline = function (recognizer) {
	    // SINGLE TOKEN DELETION
	    var matchedSymbol = this.singleTokenDeletion(recognizer);
	    if (matchedSymbol !== null) {
	        // we have deleted the extra token.
	        // now, move past ttype token as if all were ok
	        recognizer.consume();
	        return matchedSymbol;
	    }
	    // SINGLE TOKEN INSERTION
	    if (this.singleTokenInsertion(recognizer)) {
	        return this.getMissingSymbol(recognizer);
	    }
	    // even that didn't work; must throw the exception
	    throw new InputMismatchException(recognizer);
	};

	//
	// This method implements the single-token insertion inline error recovery
	// strategy. It is called by {@link //recoverInline} if the single-token
	// deletion strategy fails to recover from the mismatched input. If this
	// method returns {@code true}, {@code recognizer} will be in error recovery
	// mode.
	//
	// <p>This method determines whether or not single-token insertion is viable by
	// checking if the {@code LA(1)} input symbol could be successfully matched
	// if it were instead the {@code LA(2)} symbol. If this method returns
	// {@code true}, the caller is responsible for creating and inserting a
	// token with the correct type to produce this behavior.</p>
	//
	// @param recognizer the parser instance
	// @return {@code true} if single-token insertion is a viable recovery
	// strategy for the current mismatched input, otherwise {@code false}
	//
	DefaultErrorStrategy.prototype.singleTokenInsertion = function (recognizer) {
	    var currentSymbolType = recognizer.getTokenStream().LA(1);
	    // if current token is consistent with what could come after current
	    // ATN state, then we know we're missing a token; error recovery
	    // is free to conjure up and insert the missing token
	    var atn = recognizer._interp.atn;
	    var currentState = atn.states[recognizer.state];
	    var next = currentState.transitions[0].target;
	    var expectingAtLL2 = atn.nextTokens(next, recognizer._ctx);
	    if (expectingAtLL2.contains(currentSymbolType)) {
	        this.reportMissingToken(recognizer);
	        return true;
	    } else {
	        return false;
	    }
	};

	// This method implements the single-token deletion inline error recovery
	// strategy. It is called by {@link //recoverInline} to attempt to recover
	// from mismatched input. If this method returns null, the parser and error
	// handler state will not have changed. If this method returns non-null,
	// {@code recognizer} will <em>not</em> be in error recovery mode since the
	// returned token was a successful match.
	//
	// <p>If the single-token deletion is successful, this method calls
	// {@link //reportUnwantedToken} to report the error, followed by
	// {@link Parser//consume} to actually "delete" the extraneous token. Then,
	// before returning {@link //reportMatch} is called to signal a successful
	// match.</p>
	//
	// @param recognizer the parser instance
	// @return the successfully matched {@link Token} instance if single-token
	// deletion successfully recovers from the mismatched input, otherwise
	// {@code null}
	//
	DefaultErrorStrategy.prototype.singleTokenDeletion = function (recognizer) {
	    var nextTokenType = recognizer.getTokenStream().LA(2);
	    var expecting = this.getExpectedTokens(recognizer);
	    if (expecting.contains(nextTokenType)) {
	        this.reportUnwantedToken(recognizer);
	        // print("recoverFromMismatchedToken deleting " \
	        // + str(recognizer.getTokenStream().LT(1)) \
	        // + " since " + str(recognizer.getTokenStream().LT(2)) \
	        // + " is what we want", file=sys.stderr)
	        recognizer.consume(); // simply delete extra token
	        // we want to return the token we're actually matching
	        var matchedSymbol = recognizer.getCurrentToken();
	        this.reportMatch(recognizer); // we know current token is correct
	        return matchedSymbol;
	    } else {
	        return null;
	    }
	};

	// Conjure up a missing token during error recovery.
	//
	// The recognizer attempts to recover from single missing
	// symbols. But, actions might refer to that missing symbol.
	// For example, x=ID {f($x);}. The action clearly assumes
	// that there has been an identifier matched previously and that
	// $x points at that token. If that token is missing, but
	// the next token in the stream is what we want we assume that
	// this token is missing and we keep going. Because we
	// have to return some token to replace the missing token,
	// we have to conjure one up. This method gives the user control
	// over the tokens returned for missing tokens. Mostly,
	// you will want to create something special for identifier
	// tokens. For literals such as '{' and ',', the default
	// action in the parser or tree parser works. It simply creates
	// a CommonToken of the appropriate type. The text will be the token.
	// If you change what tokens must be created by the lexer,
	// override this method to create the appropriate tokens.
	//
	DefaultErrorStrategy.prototype.getMissingSymbol = function (recognizer) {
	    var currentSymbol = recognizer.getCurrentToken();
	    var expecting = this.getExpectedTokens(recognizer);
	    var expectedTokenType = expecting.first(); // get any element
	    var tokenText;
	    if (expectedTokenType === Token.EOF) {
	        tokenText = "<missing EOF>";
	    } else {
	        tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
	    }
	    var current = currentSymbol;
	    var lookback = recognizer.getTokenStream().LT(-1);
	    if (current.type === Token.EOF && lookback !== null) {
	        current = lookback;
	    }
	    return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
	};

	DefaultErrorStrategy.prototype.getExpectedTokens = function (recognizer) {
	    return recognizer.getExpectedTokens();
	};

	// How should a token be displayed in an error message? The default
	// is to display just the text, but during development you might
	// want to have a lot of information spit out. Override in that case
	// to use t.toString() (which, for CommonToken, dumps everything about
	// the token). This is better than forcing you to override a method in
	// your token objects because you don't have to go modify your lexer
	// so that it creates a new Java type.
	//
	DefaultErrorStrategy.prototype.getTokenErrorDisplay = function (t) {
	    if (t === null) {
	        return "<no token>";
	    }
	    var s = t.text;
	    if (s === null) {
	        if (t.type === Token.EOF) {
	            s = "<EOF>";
	        } else {
	            s = "<" + t.type + ">";
	        }
	    }
	    return this.escapeWSAndQuote(s);
	};

	DefaultErrorStrategy.prototype.escapeWSAndQuote = function (s) {
	    s = s.replace(/\n/g, "\\n");
	    s = s.replace(/\r/g, "\\r");
	    s = s.replace(/\t/g, "\\t");
	    return "'" + s + "'";
	};

	// Compute the error recovery set for the current rule. During
	// rule invocation, the parser pushes the set of tokens that can
	// follow that rule reference on the stack; this amounts to
	// computing FIRST of what follows the rule reference in the
	// enclosing rule. See LinearApproximator.FIRST().
	// This local follow set only includes tokens
	// from within the rule; i.e., the FIRST computation done by
	// ANTLR stops at the end of a rule.
	//
	// EXAMPLE
	//
	// When you find a "no viable alt exception", the input is not
	// consistent with any of the alternatives for rule r. The best
	// thing to do is to consume tokens until you see something that
	// can legally follow a call to r//or* any rule that called r.
	// You don't want the exact set of viable next tokens because the
	// input might just be missing a token--you might consume the
	// rest of the input looking for one of the missing tokens.
	//
	// Consider grammar:
	//
	// a : '[' b ']'
	// | '(' b ')'
	// ;
	// b : c '^' INT ;
	// c : ID
	// | INT
	// ;
	//
	// At each rule invocation, the set of tokens that could follow
	// that rule is pushed on a stack. Here are the various
	// context-sensitive follow sets:
	//
	// FOLLOW(b1_in_a) = FIRST(']') = ']'
	// FOLLOW(b2_in_a) = FIRST(')') = ')'
	// FOLLOW(c_in_b) = FIRST('^') = '^'
	//
	// Upon erroneous input "[]", the call chain is
	//
	// a -> b -> c
	//
	// and, hence, the follow context stack is:
	//
	// depth follow set start of rule execution
	// 0 <EOF> a (from main())
	// 1 ']' b
	// 2 '^' c
	//
	// Notice that ')' is not included, because b would have to have
	// been called from a different context in rule a for ')' to be
	// included.
	//
	// For error recovery, we cannot consider FOLLOW(c)
	// (context-sensitive or otherwise). We need the combined set of
	// all context-sensitive FOLLOW sets--the set of all tokens that
	// could follow any reference in the call chain. We need to
	// resync to one of those tokens. Note that FOLLOW(c)='^' and if
	// we resync'd to that token, we'd consume until EOF. We need to
	// sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
	// In this case, for input "[]", LA(1) is ']' and in the set, so we would
	// not consume anything. After printing an error, rule c would
	// return normally. Rule b would not find the required '^' though.
	// At this point, it gets a mismatched token error and throws an
	// exception (since LA(1) is not in the viable following token
	// set). The rule exception handler tries to recover, but finds
	// the same recovery set and doesn't consume anything. Rule b
	// exits normally returning to rule a. Now it finds the ']' (and
	// with the successful match exits errorRecovery mode).
	//
	// So, you can see that the parser walks up the call chain looking
	// for the token that was a member of the recovery set.
	//
	// Errors are not generated in errorRecovery mode.
	//
	// ANTLR's error recovery mechanism is based upon original ideas:
	//
	// "Algorithms + Data Structures = Programs" by Niklaus Wirth
	//
	// and
	//
	// "A note on error recovery in recursive descent parsers":
	// http://portal.acm.org/citation.cfm?id=947902.947905
	//
	// Later, Josef Grosch had some good ideas:
	//
	// "Efficient and Comfortable Error Recovery in Recursive Descent
	// Parsers":
	// ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
	//
	// Like Grosch I implement context-sensitive FOLLOW sets that are combined
	// at run-time upon error to avoid overhead during parsing.
	//
	DefaultErrorStrategy.prototype.getErrorRecoverySet = function (recognizer) {
	    var atn = recognizer._interp.atn;
	    var ctx = recognizer._ctx;
	    var recoverSet = new IntervalSet();
	    while (ctx !== null && ctx.invokingState >= 0) {
	        // compute what follows who invoked us
	        var invokingState = atn.states[ctx.invokingState];
	        var rt = invokingState.transitions[0];
	        var follow = atn.nextTokens(rt.followState);
	        recoverSet.addSet(follow);
	        ctx = ctx.parentCtx;
	    }
	    recoverSet.removeOne(Token.EPSILON);
	    return recoverSet;
	};

	// Consume tokens until one matches the given token set.//
	DefaultErrorStrategy.prototype.consumeUntil = function (recognizer, set) {
	    var ttype = recognizer.getTokenStream().LA(1);
	    while (ttype !== Token.EOF && !set.contains(ttype)) {
	        recognizer.consume();
	        ttype = recognizer.getTokenStream().LA(1);
	    }
	};

	//
	// This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
	// by immediately canceling the parse operation with a
	// {@link ParseCancellationException}. The implementation ensures that the
	// {@link ParserRuleContext//exception} field is set for all parse tree nodes
	// that were not completed prior to encountering the error.
	//
	// <p>
	// This error strategy is useful in the following scenarios.</p>
	//
	// <ul>
	// <li><strong>Two-stage parsing:</strong> This error strategy allows the first
	// stage of two-stage parsing to immediately terminate if an error is
	// encountered, and immediately fall back to the second stage. In addition to
	// avoiding wasted work by attempting to recover from errors here, the empty
	// implementation of {@link BailErrorStrategy//sync} improves the performance of
	// the first stage.</li>
	// <li><strong>Silent validation:</strong> When syntax errors are not being
	// reported or logged, and the parse result is simply ignored if errors occur,
	// the {@link BailErrorStrategy} avoids wasting work on recovering from errors
	// when the result will be ignored either way.</li>
	// </ul>
	//
	// <p>
	// {@code myparser.setErrorHandler(new BailErrorStrategy());}</p>
	//
	// @see Parser//setErrorHandler(ANTLRErrorStrategy)
	//
	function BailErrorStrategy() {
	    DefaultErrorStrategy.call(this);
	    return this;
	}

	BailErrorStrategy.prototype = Object.create(DefaultErrorStrategy.prototype);
	BailErrorStrategy.prototype.constructor = BailErrorStrategy;

	// Instead of recovering from exception {@code e}, re-throw it wrapped
	// in a {@link ParseCancellationException} so it is not caught by the
	// rule function catches. Use {@link Exception//getCause()} to get the
	// original {@link RecognitionException}.
	//
	BailErrorStrategy.prototype.recover = function (recognizer, e) {
	    var context = recognizer._ctx;
	    while (context !== null) {
	        context.exception = e;
	        context = context.parentCtx;
	    }
	    throw new ParseCancellationException(e);
	};

	// Make sure we don't attempt to recover inline; if the parser
	// successfully recovers, it won't throw an exception.
	//
	BailErrorStrategy.prototype.recoverInline = function (recognizer) {
	    this.recover(recognizer, new InputMismatchException(recognizer));
	};

	// Make sure we don't attempt to recover from problems in subrules.//
	BailErrorStrategy.prototype.sync = function (recognizer) {
	    // pass
	};

	exports.BailErrorStrategy = BailErrorStrategy;
	exports.DefaultErrorStrategy = DefaultErrorStrategy;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	var Token = __webpack_require__(6).Token;

	// Vacuum all input from a string and then treat it like a buffer.

	function _loadString(stream) {
		stream._index = 0;
		stream.data = [];
		for (var i = 0; i < stream.strdata.length; i++) {
			stream.data.push(stream.strdata.charCodeAt(i));
		}
		stream._size = stream.data.length;
	}

	function InputStream(data) {
		this.name = "<empty>";
		this.strdata = data;
		_loadString(this);
		return this;
	}

	Object.defineProperty(InputStream.prototype, "index", {
		get: function get() {
			return this._index;
		}
	});

	Object.defineProperty(InputStream.prototype, "size", {
		get: function get() {
			return this._size;
		}
	});

	// Reset the stream so that it's in the same state it was
	// when the object was created *except* the data array is not
	// touched.
	//
	InputStream.prototype.reset = function () {
		this._index = 0;
	};

	InputStream.prototype.consume = function () {
		if (this._index >= this._size) {
			// assert this.LA(1) == Token.EOF
			throw "cannot consume EOF";
		}
		this._index += 1;
	};

	InputStream.prototype.LA = function (offset) {
		if (offset === 0) {
			return 0; // undefined
		}
		if (offset < 0) {
			offset += 1; // e.g., translate LA(-1) to use offset=0
		}
		var pos = this._index + offset - 1;
		if (pos < 0 || pos >= this._size) {
			// invalid
			return Token.EOF;
		}
		return this.data[pos];
	};

	InputStream.prototype.LT = function (offset) {
		return this.LA(offset);
	};

	// mark/release do nothing; we have entire buffer
	InputStream.prototype.mark = function () {
		return -1;
	};

	InputStream.prototype.release = function (marker) {};

	// consume() ahead until p==_index; can't just set p=_index as we must
	// update line and column. If we seek backwards, just set p
	//
	InputStream.prototype.seek = function (_index) {
		if (_index <= this._index) {
			this._index = _index; // just jump; don't update stream state (line,
			// ...)
			return;
		}
		// seek forward
		this._index = Math.min(_index, this._size);
	};

	InputStream.prototype.getText = function (start, stop) {
		if (stop >= this._size) {
			stop = this._size - 1;
		}
		if (start >= this._size) {
			return "";
		} else {
			return this.strdata.slice(start, stop + 1);
		}
	};

	InputStream.prototype.toString = function () {
		return this.strdata;
	};

	exports.InputStream = InputStream;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	//

	//
	//  This is an InputStream that is loaded from a file all at once
	//  when you construct the object.
	//
	var InputStream = __webpack_require__(40).InputStream;
	var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
	var fs = isNodeJs ? __webpack_require__(42) : null;

	function FileStream(fileName) {
		var data = fs.readFileSync(fileName, "utf8");
		InputStream.call(this, data);
		this.fileName = fileName;
		return this;
	}

	FileStream.prototype = Object.create(InputStream.prototype);
	FileStream.prototype.constructor = FileStream;

	exports.FileStream = FileStream;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	console.log("I'm `fs` modules");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */
	///

	//
	// This class extends {@link BufferedTokenStream} with functionality to filter
	// token streams to tokens on a particular channel (tokens where
	// {@link Token//getChannel} returns a particular value).
	//
	// <p>
	// This token stream provides access to all tokens by index or when calling
	// methods like {@link //getText}. The channel filtering is only used for code
	// accessing tokens via the lookahead methods {@link //LA}, {@link //LT}, and
	// {@link //LB}.</p>
	//
	// <p>
	// By default, tokens are placed on the default channel
	// ({@link Token//DEFAULT_CHANNEL}), but may be reassigned by using the
	// {@code ->channel(HIDDEN)} lexer command, or by using an embedded action to
	// call {@link Lexer//setChannel}.
	// </p>
	//
	// <p>
	// Note: lexer rules which use the {@code ->skip} lexer command or call
	// {@link Lexer//skip} do not produce tokens at all, so input text matched by
	// such a rule will not be available as part of the token stream, regardless of
	// channel.</p>
	///

	var Token = __webpack_require__(6).Token;
	var BufferedTokenStream = __webpack_require__(44).BufferedTokenStream;

	function CommonTokenStream(lexer, channel) {
	    BufferedTokenStream.call(this, lexer);
	    this.channel = channel === undefined ? Token.DEFAULT_CHANNEL : channel;
	    return this;
	}

	CommonTokenStream.prototype = Object.create(BufferedTokenStream.prototype);
	CommonTokenStream.prototype.constructor = CommonTokenStream;

	CommonTokenStream.prototype.adjustSeekIndex = function (i) {
	    return this.nextTokenOnChannel(i, this.channel);
	};

	CommonTokenStream.prototype.LB = function (k) {
	    if (k === 0 || this.index - k < 0) {
	        return null;
	    }
	    var i = this.index;
	    var n = 1;
	    // find k good tokens looking backwards
	    while (n <= k) {
	        // skip off-channel tokens
	        i = this.previousTokenOnChannel(i - 1, this.channel);
	        n += 1;
	    }
	    if (i < 0) {
	        return null;
	    }
	    return this.tokens[i];
	};

	CommonTokenStream.prototype.LT = function (k) {
	    this.lazyInit();
	    if (k === 0) {
	        return null;
	    }
	    if (k < 0) {
	        return this.LB(-k);
	    }
	    var i = this.index;
	    var n = 1; // we know tokens[pos] is a good one
	    // find k good tokens
	    while (n < k) {
	        // skip off-channel tokens, but make sure to not look past EOF
	        if (this.sync(i + 1)) {
	            i = this.nextTokenOnChannel(i + 1, this.channel);
	        }
	        n += 1;
	    }
	    return this.tokens[i];
	};

	// Count EOF just once.///
	CommonTokenStream.prototype.getNumberOfOnChannelTokens = function () {
	    var n = 0;
	    this.fill();
	    for (var i = 0; i < this.tokens.length; i++) {
	        var t = this.tokens[i];
	        if (t.channel === this.channel) {
	            n += 1;
	        }
	        if (t.type === Token.EOF) {
	            break;
	        }
	    }
	    return n;
	};

	exports.CommonTokenStream = CommonTokenStream;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	// This implementation of {@link TokenStream} loads tokens from a
	// {@link TokenSource} on-demand, and places the tokens in a buffer to provide
	// access to any previous token by index.
	//
	// <p>
	// This token stream ignores the value of {@link Token//getChannel}. If your
	// parser requires the token stream filter tokens to only those on a particular
	// channel, such as {@link Token//DEFAULT_CHANNEL} or
	// {@link Token//HIDDEN_CHANNEL}, use a filtering token stream such a
	// {@link CommonTokenStream}.</p>

	var Token = __webpack_require__(6).Token;
	var Lexer = __webpack_require__(22).Lexer;
	var Interval = __webpack_require__(10).Interval;

	// this is just to keep meaningful parameter types to Parser
	function TokenStream() {
		return this;
	}

	function BufferedTokenStream(tokenSource) {

		TokenStream.call(this);
		// The {@link TokenSource} from which tokens for this stream are fetched.
		this.tokenSource = tokenSource;

		// A collection of all tokens fetched from the token source. The list is
		// considered a complete view of the input once {@link //fetchedEOF} is set
		// to {@code true}.
		this.tokens = [];

		// The index into {@link //tokens} of the current token (next token to
		// {@link //consume}). {@link //tokens}{@code [}{@link //p}{@code ]} should
		// be
		// {@link //LT LT(1)}.
		//
		// <p>This field is set to -1 when the stream is first constructed or when
		// {@link //setTokenSource} is called, indicating that the first token has
		// not yet been fetched from the token source. For additional information,
		// see the documentation of {@link IntStream} for a description of
		// Initializing Methods.</p>
		this.index = -1;

		// Indicates whether the {@link Token//EOF} token has been fetched from
		// {@link //tokenSource} and added to {@link //tokens}. This field improves
		// performance for the following cases:
		//
		// <ul>
		// <li>{@link //consume}: The lookahead check in {@link //consume} to
		// prevent
		// consuming the EOF symbol is optimized by checking the values of
		// {@link //fetchedEOF} and {@link //p} instead of calling {@link
		// //LA}.</li>
		// <li>{@link //fetch}: The check to prevent adding multiple EOF symbols
		// into
		// {@link //tokens} is trivial with this field.</li>
		// <ul>
		this.fetchedEOF = false;
		return this;
	}

	BufferedTokenStream.prototype = Object.create(TokenStream.prototype);
	BufferedTokenStream.prototype.constructor = BufferedTokenStream;

	BufferedTokenStream.prototype.mark = function () {
		return 0;
	};

	BufferedTokenStream.prototype.release = function (marker) {
		// no resources to release
	};

	BufferedTokenStream.prototype.reset = function () {
		this.seek(0);
	};

	BufferedTokenStream.prototype.seek = function (index) {
		this.lazyInit();
		this.index = this.adjustSeekIndex(index);
	};

	BufferedTokenStream.prototype.get = function (index) {
		this.lazyInit();
		return this.tokens[index];
	};

	BufferedTokenStream.prototype.consume = function () {
		var skipEofCheck = false;
		if (this.index >= 0) {
			if (this.fetchedEOF) {
				// the last token in tokens is EOF. skip check if p indexes any
				// fetched token except the last.
				skipEofCheck = this.index < this.tokens.length - 1;
			} else {
				// no EOF token in tokens. skip check if p indexes a fetched token.
				skipEofCheck = this.index < this.tokens.length;
			}
		} else {
			// not yet initialized
			skipEofCheck = false;
		}
		if (!skipEofCheck && this.LA(1) === Token.EOF) {
			throw "cannot consume EOF";
		}
		if (this.sync(this.index + 1)) {
			this.index = this.adjustSeekIndex(this.index + 1);
		}
	};

	// Make sure index {@code i} in tokens has a token.
	//
	// @return {@code true} if a token is located at index {@code i}, otherwise
	// {@code false}.
	// @see //get(int i)
	// /
	BufferedTokenStream.prototype.sync = function (i) {
		var n = i - this.tokens.length + 1; // how many more elements we need?
		if (n > 0) {
			var fetched = this.fetch(n);
			return fetched >= n;
		}
		return true;
	};

	// Add {@code n} elements to buffer.
	//
	// @return The actual number of elements added to the buffer.
	// /
	BufferedTokenStream.prototype.fetch = function (n) {
		if (this.fetchedEOF) {
			return 0;
		}
		for (var i = 0; i < n; i++) {
			var t = this.tokenSource.nextToken();
			t.tokenIndex = this.tokens.length;
			this.tokens.push(t);
			if (t.type === Token.EOF) {
				this.fetchedEOF = true;
				return i + 1;
			}
		}
		return n;
	};

	// Get all tokens from start..stop inclusively///
	BufferedTokenStream.prototype.getTokens = function (start, stop, types) {
		if (types === undefined) {
			types = null;
		}
		if (start < 0 || stop < 0) {
			return null;
		}
		this.lazyInit();
		var subset = [];
		if (stop >= this.tokens.length) {
			stop = this.tokens.length - 1;
		}
		for (var i = start; i < stop; i++) {
			var t = this.tokens[i];
			if (t.type === Token.EOF) {
				break;
			}
			if (types === null || types.contains(t.type)) {
				subset.push(t);
			}
		}
		return subset;
	};

	BufferedTokenStream.prototype.LA = function (i) {
		return this.LT(i).type;
	};

	BufferedTokenStream.prototype.LB = function (k) {
		if (this.index - k < 0) {
			return null;
		}
		return this.tokens[this.index - k];
	};

	BufferedTokenStream.prototype.LT = function (k) {
		this.lazyInit();
		if (k === 0) {
			return null;
		}
		if (k < 0) {
			return this.LB(-k);
		}
		var i = this.index + k - 1;
		this.sync(i);
		if (i >= this.tokens.length) {
			// return EOF token
			// EOF must be last token
			return this.tokens[this.tokens.length - 1];
		}
		return this.tokens[i];
	};

	// Allowed derived classes to modify the behavior of operations which change
	// the current stream position by adjusting the target token index of a seek
	// operation. The default implementation simply returns {@code i}. If an
	// exception is thrown in this method, the current stream index should not be
	// changed.
	//
	// <p>For example, {@link CommonTokenStream} overrides this method to ensure
	// that
	// the seek target is always an on-channel token.</p>
	//
	// @param i The target token index.
	// @return The adjusted target token index.

	BufferedTokenStream.prototype.adjustSeekIndex = function (i) {
		return i;
	};

	BufferedTokenStream.prototype.lazyInit = function () {
		if (this.index === -1) {
			this.setup();
		}
	};

	BufferedTokenStream.prototype.setup = function () {
		this.sync(0);
		this.index = this.adjustSeekIndex(0);
	};

	// Reset this token stream by setting its token source.///
	BufferedTokenStream.prototype.setTokenSource = function (tokenSource) {
		this.tokenSource = tokenSource;
		this.tokens = [];
		this.index = -1;
	};

	// Given a starting index, return the index of the next token on channel.
	// Return i if tokens[i] is on channel. Return -1 if there are no tokens
	// on channel between i and EOF.
	// /
	BufferedTokenStream.prototype.nextTokenOnChannel = function (i, channel) {
		this.sync(i);
		if (i >= this.tokens.length) {
			return -1;
		}
		var token = this.tokens[i];
		while (token.channel !== this.channel) {
			if (token.type === Token.EOF) {
				return -1;
			}
			i += 1;
			this.sync(i);
			token = this.tokens[i];
		}
		return i;
	};

	// Given a starting index, return the index of the previous token on channel.
	// Return i if tokens[i] is on channel. Return -1 if there are no tokens
	// on channel between i and 0.
	BufferedTokenStream.prototype.previousTokenOnChannel = function (i, channel) {
		while (i >= 0 && this.tokens[i].channel !== channel) {
			i -= 1;
		}
		return i;
	};

	// Collect all tokens on specified channel to the right of
	// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
	// EOF. If channel is -1, find any non default channel token.
	BufferedTokenStream.prototype.getHiddenTokensToRight = function (tokenIndex, channel) {
		if (channel === undefined) {
			channel = -1;
		}
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
			throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
		}
		var nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		var from_ = tokenIndex + 1;
		// if none onchannel to right, nextOnChannel=-1 so set to = last token
		var to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
		return this.filterForChannel(from_, to, channel);
	};

	// Collect all tokens on specified channel to the left of
	// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
	// If channel is -1, find any non default channel token.
	BufferedTokenStream.prototype.getHiddenTokensToLeft = function (tokenIndex, channel) {
		if (channel === undefined) {
			channel = -1;
		}
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
			throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
		}
		var prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		if (prevOnChannel === tokenIndex - 1) {
			return null;
		}
		// if none on channel to left, prevOnChannel=-1 then from=0
		var from_ = prevOnChannel + 1;
		var to = tokenIndex - 1;
		return this.filterForChannel(from_, to, channel);
	};

	BufferedTokenStream.prototype.filterForChannel = function (left, right, channel) {
		var hidden = [];
		for (var i = left; i < right + 1; i++) {
			var t = this.tokens[i];
			if (channel === -1) {
				if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
					hidden.push(t);
				}
			} else if (t.channel === channel) {
				hidden.push(t);
			}
		}
		if (hidden.length === 0) {
			return null;
		}
		return hidden;
	};

	BufferedTokenStream.prototype.getSourceName = function () {
		return this.tokenSource.getSourceName();
	};

	// Get the text of all tokens in this buffer.///
	BufferedTokenStream.prototype.getText = function (interval) {
		this.lazyInit();
		this.fill();
		if (interval === undefined || interval === null) {
			interval = new Interval(0, this.tokens.length - 1);
		}
		var start = interval.start;
		if (start instanceof Token) {
			start = start.tokenIndex;
		}
		var stop = interval.stop;
		if (stop instanceof Token) {
			stop = stop.tokenIndex;
		}
		if (start === null || stop === null || start < 0 || stop < 0) {
			return "";
		}
		if (stop >= this.tokens.length) {
			stop = this.tokens.length - 1;
		}
		var s = "";
		for (var i = start; i < stop + 1; i++) {
			var t = this.tokens[i];
			if (t.type === Token.EOF) {
				break;
			}
			s = s + t.text;
		}
		return s;
	};

	// Get all tokens from lexer until EOF///
	BufferedTokenStream.prototype.fill = function () {
		this.lazyInit();
		while (this.fetch(1000) === 1000) {
			continue;
		}
	};

	exports.BufferedTokenStream = BufferedTokenStream;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Copyright (c) 2012-2016 The ANTLR Project. All rights reserved.
	 * Use of this file is governed by the BSD 3-clause license that
	 * can be found in the LICENSE.txt file in the project root.
	 */

	var Token = __webpack_require__(6).Token;
	var ParseTreeListener = __webpack_require__(14).ParseTreeListener;
	var Recognizer = __webpack_require__(23).Recognizer;
	var DefaultErrorStrategy = __webpack_require__(39).DefaultErrorStrategy;
	var ATNDeserializer = __webpack_require__(17).ATNDeserializer;
	var ATNDeserializationOptions = __webpack_require__(19).ATNDeserializationOptions;
	var TerminalNode = __webpack_require__(14).TerminalNode;
	var ErrorNode = __webpack_require__(14).ErrorNode;

	function TraceListener(parser) {
		ParseTreeListener.call(this);
		this.parser = parser;
		return this;
	}

	TraceListener.prototype = Object.create(ParseTreeListener);
	TraceListener.prototype.constructor = TraceListener;

	TraceListener.prototype.enterEveryRule = function (ctx) {
		console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
	};

	TraceListener.prototype.visitTerminal = function (node) {
		console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
	};

	TraceListener.prototype.exitEveryRule = function (ctx) {
		console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
	};

	// this is all the parsing support code essentially; most of it is error
	// recovery stuff.//
	function Parser(input) {
		Recognizer.call(this);
		// The input stream.
		this._input = null;
		// The error handling strategy for the parser. The default value is a new
		// instance of {@link DefaultErrorStrategy}.
		this._errHandler = new DefaultErrorStrategy();
		this._precedenceStack = [];
		this._precedenceStack.push(0);
		// The {@link ParserRuleContext} object for the currently executing rule.
		// this is always non-null during the parsing process.
		this._ctx = null;
		// Specifies whether or not the parser should construct a parse tree during
		// the parsing process. The default value is {@code true}.
		this.buildParseTrees = true;
		// When {@link //setTrace}{@code (true)} is called, a reference to the
		// {@link TraceListener} is stored here so it can be easily removed in a
		// later call to {@link //setTrace}{@code (false)}. The listener itself is
		// implemented as a parser listener so this field is not directly used by
		// other parser methods.
		this._tracer = null;
		// The list of {@link ParseTreeListener} listeners registered to receive
		// events during the parse.
		this._parseListeners = null;
		// The number of syntax errors reported during parsing. this value is
		// incremented each time {@link //notifyErrorListeners} is called.
		this._syntaxErrors = 0;
		this.setInputStream(input);
		return this;
	}

	Parser.prototype = Object.create(Recognizer.prototype);
	Parser.prototype.contructor = Parser;

	// this field maps from the serialized ATN string to the deserialized {@link
	// ATN} with
	// bypass alternatives.
	//
	// @see ATNDeserializationOptions//isGenerateRuleBypassTransitions()
	//
	Parser.bypassAltsAtnCache = {};

	// reset the parser's state//
	Parser.prototype.reset = function () {
		if (this._input !== null) {
			this._input.seek(0);
		}
		this._errHandler.reset(this);
		this._ctx = null;
		this._syntaxErrors = 0;
		this.setTrace(false);
		this._precedenceStack = [];
		this._precedenceStack.push(0);
		if (this._interp !== null) {
			this._interp.reset();
		}
	};

	// Match current input symbol against {@code ttype}. If the symbol type
	// matches, {@link ANTLRErrorStrategy//reportMatch} and {@link //consume} are
	// called to complete the match process.
	//
	// <p>If the symbol type does not match,
	// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	// strategy to attempt recovery. If {@link //getBuildParseTree} is
	// {@code true} and the token index of the symbol returned by
	// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
	//
	// @param ttype the token type to match
	// @return the matched symbol
	// @throws RecognitionException if the current input symbol did not match
	// {@code ttype} and the error strategy could not recover from the
	// mismatched symbol

	Parser.prototype.match = function (ttype) {
		var t = this.getCurrentToken();
		if (t.type === ttype) {
			this._errHandler.reportMatch(this);
			this.consume();
		} else {
			t = this._errHandler.recoverInline(this);
			if (this.buildParseTrees && t.tokenIndex === -1) {
				// we must have conjured up a new token during single token
				// insertion
				// if it's not the current symbol
				this._ctx.addErrorNode(t);
			}
		}
		return t;
	};
	// Match current input symbol as a wildcard. If the symbol type matches
	// (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
	// and {@link //consume} are called to complete the match process.
	//
	// <p>If the symbol type does not match,
	// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	// strategy to attempt recovery. If {@link //getBuildParseTree} is
	// {@code true} and the token index of the symbol returned by
	// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
	//
	// @return the matched symbol
	// @throws RecognitionException if the current input symbol did not match
	// a wildcard and the error strategy could not recover from the mismatched
	// symbol

	Parser.prototype.matchWildcard = function () {
		var t = this.getCurrentToken();
		if (t.type > 0) {
			this._errHandler.reportMatch(this);
			this.consume();
		} else {
			t = this._errHandler.recoverInline(this);
			if (this._buildParseTrees && t.tokenIndex === -1) {
				// we must have conjured up a new token during single token
				// insertion
				// if it's not the current symbol
				this._ctx.addErrorNode(t);
			}
		}
		return t;
	};

	Parser.prototype.getParseListeners = function () {
		return this._parseListeners || [];
	};

	// Registers {@code listener} to receive events during the parsing process.
	//
	// <p>To support output-preserving grammar transformations (including but not
	// limited to left-recursion removal, automated left-factoring, and
	// optimized code generation), calls to listener methods during the parse
	// may differ substantially from calls made by
	// {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
	// particular, rule entry and exit events may occur in a different order
	// during the parse than after the parser. In addition, calls to certain
	// rule entry methods may be omitted.</p>
	//
	// <p>With the following specific exceptions, calls to listener events are
	// <em>deterministic</em>, i.e. for identical input the calls to listener
	// methods will be the same.</p>
	//
	// <ul>
	// <li>Alterations to the grammar used to generate code may change the
	// behavior of the listener calls.</li>
	// <li>Alterations to the command line options passed to ANTLR 4 when
	// generating the parser may change the behavior of the listener calls.</li>
	// <li>Changing the version of the ANTLR Tool used to generate the parser
	// may change the behavior of the listener calls.</li>
	// </ul>
	//
	// @param listener the listener to add
	//
	// @throws NullPointerException if {@code} listener is {@code null}
	//
	Parser.prototype.addParseListener = function (listener) {
		if (listener === null) {
			throw "listener";
		}
		if (this._parseListeners === null) {
			this._parseListeners = [];
		}
		this._parseListeners.push(listener);
	};

	//
	// Remove {@code listener} from the list of parse listeners.
	//
	// <p>If {@code listener} is {@code null} or has not been added as a parse
	// listener, this method does nothing.</p>
	// @param listener the listener to remove
	//
	Parser.prototype.removeParseListener = function (listener) {
		if (this._parseListeners !== null) {
			var idx = this._parseListeners.indexOf(listener);
			if (idx >= 0) {
				this._parseListeners.splice(idx, 1);
			}
			if (this._parseListeners.length === 0) {
				this._parseListeners = null;
			}
		}
	};

	// Remove all parse listeners.
	Parser.prototype.removeParseListeners = function () {
		this._parseListeners = null;
	};

	// Notify any parse listeners of an enter rule event.
	Parser.prototype.triggerEnterRuleEvent = function () {
		if (this._parseListeners !== null) {
			var ctx = this._ctx;
			this._parseListeners.map(function (listener) {
				listener.enterEveryRule(ctx);
				ctx.enterRule(listener);
			});
		}
	};

	//
	// Notify any parse listeners of an exit rule event.
	//
	// @see //addParseListener
	//
	Parser.prototype.triggerExitRuleEvent = function () {
		if (this._parseListeners !== null) {
			// reverse order walk of listeners
			var ctx = this._ctx;
			this._parseListeners.slice(0).reverse().map(function (listener) {
				ctx.exitRule(listener);
				listener.exitEveryRule(ctx);
			});
		}
	};

	Parser.prototype.getTokenFactory = function () {
		return this._input.tokenSource._factory;
	};

	// Tell our token source and error strategy about a new way to create tokens.//
	Parser.prototype.setTokenFactory = function (factory) {
		this._input.tokenSource._factory = factory;
	};

	// The ATN with bypass alternatives is expensive to create so we create it
	// lazily.
	//
	// @throws UnsupportedOperationException if the current parser does not
	// implement the {@link //getSerializedATN()} method.
	//
	Parser.prototype.getATNWithBypassAlts = function () {
		var serializedAtn = this.getSerializedATN();
		if (serializedAtn === null) {
			throw "The current parser does not support an ATN with bypass alternatives.";
		}
		var result = this.bypassAltsAtnCache[serializedAtn];
		if (result === null) {
			var deserializationOptions = new ATNDeserializationOptions();
			deserializationOptions.generateRuleBypassTransitions = true;
			result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
			this.bypassAltsAtnCache[serializedAtn] = result;
		}
		return result;
	};

	// The preferred method of getting a tree pattern. For example, here's a
	// sample use:
	//
	// <pre>
	// ParseTree t = parser.expr();
	// ParseTreePattern p = parser.compileParseTreePattern("&lt;ID&gt;+0",
	// MyParser.RULE_expr);
	// ParseTreeMatch m = p.match(t);
	// String id = m.get("ID");
	// </pre>

	var Lexer = __webpack_require__(22).Lexer;

	Parser.prototype.compileParseTreePattern = function (pattern, patternRuleIndex, lexer) {
		lexer = lexer || null;
		if (lexer === null) {
			if (this.getTokenStream() !== null) {
				var tokenSource = this.getTokenStream().tokenSource;
				if (tokenSource instanceof Lexer) {
					lexer = tokenSource;
				}
			}
		}
		if (lexer === null) {
			throw "Parser can't discover a lexer to use";
		}
		var m = new ParseTreePatternMatcher(lexer, this);
		return m.compile(pattern, patternRuleIndex);
	};

	Parser.prototype.getInputStream = function () {
		return this.getTokenStream();
	};

	Parser.prototype.setInputStream = function (input) {
		this.setTokenStream(input);
	};

	Parser.prototype.getTokenStream = function () {
		return this._input;
	};

	// Set the token stream and reset the parser.//
	Parser.prototype.setTokenStream = function (input) {
		this._input = null;
		this.reset();
		this._input = input;
	};

	// Match needs to return the current input symbol, which gets put
	// into the label for the associated token ref; e.g., x=ID.
	//
	Parser.prototype.getCurrentToken = function () {
		return this._input.LT(1);
	};

	Parser.prototype.notifyErrorListeners = function (msg, offendingToken, err) {
		offendingToken = offendingToken || null;
		err = err || null;
		if (offendingToken === null) {
			offendingToken = this.getCurrentToken();
		}
		this._syntaxErrors += 1;
		var line = offendingToken.line;
		var column = offendingToken.column;
		var listener = this.getErrorListenerDispatch();
		listener.syntaxError(this, offendingToken, line, column, msg, err);
	};

	//
	// Consume and return the {@linkplain //getCurrentToken current symbol}.
	//
	// <p>E.g., given the following input with {@code A} being the current
	// lookahead symbol, this function moves the cursor to {@code B} and returns
	// {@code A}.</p>
	//
	// <pre>
	// A B
	// ^
	// </pre>
	//
	// If the parser is not in error recovery mode, the consumed symbol is added
	// to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
	// {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
	// If the parser <em>is</em> in error recovery mode, the consumed symbol is
	// added to the parse tree using
	// {@link ParserRuleContext//addErrorNode(Token)}, and
	// {@link ParseTreeListener//visitErrorNode} is called on any parse
	// listeners.
	//
	Parser.prototype.consume = function () {
		var o = this.getCurrentToken();
		if (o.type !== Token.EOF) {
			this.getInputStream().consume();
		}
		var hasListener = this._parseListeners !== null && this._parseListeners.length > 0;
		if (this.buildParseTrees || hasListener) {
			var node;
			if (this._errHandler.inErrorRecoveryMode(this)) {
				node = this._ctx.addErrorNode(o);
			} else {
				node = this._ctx.addTokenNode(o);
			}
			node.invokingState = this.state;
			if (hasListener) {
				this._parseListeners.map(function (listener) {
					if (node instanceof ErrorNode || node.isErrorNode !== undefined && node.isErrorNode()) {
						listener.visitErrorNode(node);
					} else if (node instanceof TerminalNode) {
						listener.visitTerminal(node);
					}
				});
			}
		}
		return o;
	};

	Parser.prototype.addContextToParseTree = function () {
		// add current context to parent if we have a parent
		if (this._ctx.parentCtx !== null) {
			this._ctx.parentCtx.addChild(this._ctx);
		}
	};

	// Always called by generated parsers upon entry to a rule. Access field
	// {@link //_ctx} get the current context.

	Parser.prototype.enterRule = function (localctx, state, ruleIndex) {
		this.state = state;
		this._ctx = localctx;
		this._ctx.start = this._input.LT(1);
		if (this.buildParseTrees) {
			this.addContextToParseTree();
		}
		if (this._parseListeners !== null) {
			this.triggerEnterRuleEvent();
		}
	};

	Parser.prototype.exitRule = function () {
		this._ctx.stop = this._input.LT(-1);
		// trigger event on _ctx, before it reverts to parent
		if (this._parseListeners !== null) {
			this.triggerExitRuleEvent();
		}
		this.state = this._ctx.invokingState;
		this._ctx = this._ctx.parentCtx;
	};

	Parser.prototype.enterOuterAlt = function (localctx, altNum) {
		localctx.setAltNumber(altNum);
		// if we have new localctx, make sure we replace existing ctx
		// that is previous child of parse tree
		if (this.buildParseTrees && this._ctx !== localctx) {
			if (this._ctx.parentCtx !== null) {
				this._ctx.parentCtx.removeLastChild();
				this._ctx.parentCtx.addChild(localctx);
			}
		}
		this._ctx = localctx;
	};

	// Get the precedence level for the top-most precedence rule.
	//
	// @return The precedence level for the top-most precedence rule, or -1 if
	// the parser context is not nested within a precedence rule.

	Parser.prototype.getPrecedence = function () {
		if (this._precedenceStack.length === 0) {
			return -1;
		} else {
			return this._precedenceStack[this._precedenceStack.length - 1];
		}
	};

	Parser.prototype.enterRecursionRule = function (localctx, state, ruleIndex, precedence) {
		this.state = state;
		this._precedenceStack.push(precedence);
		this._ctx = localctx;
		this._ctx.start = this._input.LT(1);
		if (this._parseListeners !== null) {
			this.triggerEnterRuleEvent(); // simulates rule entry for
			// left-recursive rules
		}
	};

	//
	// Like {@link //enterRule} but for recursive rules.

	Parser.prototype.pushNewRecursionContext = function (localctx, state, ruleIndex) {
		var previous = this._ctx;
		previous.parentCtx = localctx;
		previous.invokingState = state;
		previous.stop = this._input.LT(-1);

		this._ctx = localctx;
		this._ctx.start = previous.start;
		if (this.buildParseTrees) {
			this._ctx.addChild(previous);
		}
		if (this._parseListeners !== null) {
			this.triggerEnterRuleEvent(); // simulates rule entry for
			// left-recursive rules
		}
	};

	Parser.prototype.unrollRecursionContexts = function (parentCtx) {
		this._precedenceStack.pop();
		this._ctx.stop = this._input.LT(-1);
		var retCtx = this._ctx; // save current ctx (return value)
		// unroll so _ctx is as it was before call to recursive method
		if (this._parseListeners !== null) {
			while (this._ctx !== parentCtx) {
				this.triggerExitRuleEvent();
				this._ctx = this._ctx.parentCtx;
			}
		} else {
			this._ctx = parentCtx;
		}
		// hook into tree
		retCtx.parentCtx = parentCtx;
		if (this.buildParseTrees && parentCtx !== null) {
			// add return ctx into invoking rule's tree
			parentCtx.addChild(retCtx);
		}
	};

	Parser.prototype.getInvokingContext = function (ruleIndex) {
		var ctx = this._ctx;
		while (ctx !== null) {
			if (ctx.ruleIndex === ruleIndex) {
				return ctx;
			}
			ctx = ctx.parentCtx;
		}
		return null;
	};

	Parser.prototype.precpred = function (localctx, precedence) {
		return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
	};

	Parser.prototype.inContext = function (context) {
		// TODO: useful in parser?
		return false;
	};

	//
	// Checks whether or not {@code symbol} can follow the current state in the
	// ATN. The behavior of this method is equivalent to the following, but is
	// implemented such that the complete context-sensitive follow set does not
	// need to be explicitly constructed.
	//
	// <pre>
	// return getExpectedTokens().contains(symbol);
	// </pre>
	//
	// @param symbol the symbol type to check
	// @return {@code true} if {@code symbol} can follow the current state in
	// the ATN, otherwise {@code false}.

	Parser.prototype.isExpectedToken = function (symbol) {
		var atn = this._interp.atn;
		var ctx = this._ctx;
		var s = atn.states[this.state];
		var following = atn.nextTokens(s);
		if (following.contains(symbol)) {
			return true;
		}
		if (!following.contains(Token.EPSILON)) {
			return false;
		}
		while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
			var invokingState = atn.states[ctx.invokingState];
			var rt = invokingState.transitions[0];
			following = atn.nextTokens(rt.followState);
			if (following.contains(symbol)) {
				return true;
			}
			ctx = ctx.parentCtx;
		}
		if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
			return true;
		} else {
			return false;
		}
	};

	// Computes the set of input symbols which could follow the current parser
	// state and context, as given by {@link //getState} and {@link //getContext},
	// respectively.
	//
	// @see ATN//getExpectedTokens(int, RuleContext)
	//
	Parser.prototype.getExpectedTokens = function () {
		return this._interp.atn.getExpectedTokens(this.state, this._ctx);
	};

	Parser.prototype.getExpectedTokensWithinCurrentRule = function () {
		var atn = this._interp.atn;
		var s = atn.states[this.state];
		return atn.nextTokens(s);
	};

	// Get a rule's index (i.e., {@code RULE_ruleName} field) or -1 if not found.//
	Parser.prototype.getRuleIndex = function (ruleName) {
		var ruleIndex = this.getRuleIndexMap()[ruleName];
		if (ruleIndex !== null) {
			return ruleIndex;
		} else {
			return -1;
		}
	};

	// Return List&lt;String&gt; of the rule names in your parser instance
	// leading up to a call to the current rule. You could override if
	// you want more details such as the file/line info of where
	// in the ATN a rule is invoked.
	//
	// this is very useful for error messages.
	//
	Parser.prototype.getRuleInvocationStack = function (p) {
		p = p || null;
		if (p === null) {
			p = this._ctx;
		}
		var stack = [];
		while (p !== null) {
			// compute what follows who invoked us
			var ruleIndex = p.ruleIndex;
			if (ruleIndex < 0) {
				stack.push("n/a");
			} else {
				stack.push(this.ruleNames[ruleIndex]);
			}
			p = p.parentCtx;
		}
		return stack;
	};

	// For debugging and other purposes.//
	Parser.prototype.getDFAStrings = function () {
		return this._interp.decisionToDFA.toString();
	};
	// For debugging and other purposes.//
	Parser.prototype.dumpDFA = function () {
		var seenOne = false;
		for (var i = 0; i < this._interp.decisionToDFA.length; i++) {
			var dfa = this._interp.decisionToDFA[i];
			if (dfa.states.length > 0) {
				if (seenOne) {
					console.log();
				}
				this.printer.println("Decision " + dfa.decision + ":");
				this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
				seenOne = true;
			}
		}
	};

	/*
	"			printer = function() {\r\n" +
	"				this.println = function(s) { document.getElementById('output') += s + '\\n'; }\r\n" +
	"				this.print = function(s) { document.getElementById('output') += s; }\r\n" +
	"			};\r\n" +
	*/

	Parser.prototype.getSourceName = function () {
		return this._input.sourceName;
	};

	// During a parse is sometimes useful to listen in on the rule entry and exit
	// events as well as token matches. this is for quick and dirty debugging.
	//
	Parser.prototype.setTrace = function (trace) {
		if (!trace) {
			this.removeParseListener(this._tracer);
			this._tracer = null;
		} else {
			if (this._tracer !== null) {
				this.removeParseListener(this._tracer);
			}
			this._tracer = new TraceListener(this);
			this.addParseListener(this._tracer);
		}
	};

	exports.Parser = Parser;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// Generated from Artling.g4 by ANTLR 4.5.2
	// jshint ignore: start
	var antlr4 = __webpack_require__(1);

	var serializedATN = ["\x03\u0430\uD6D1\u8206\uAD2D\u4417\uAEF1\u8D80\uAADD", "\x02\x06\x1E\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04", "\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x03", "\x06\x03\x0F\n\x03\r\x03\x0E\x03\x10\x03\x04\x06", "\x04\x14\n\x04\r\x04\x0E\x04\x15\x03\x04\x03\x04", "\x03\x05\x06\x05\x1B\n\x05\r\x05\x0E\x05\x1C\x02", "\x02\x06\x03\x03\x05\x04\x07\x05\t\x06\x03\x02", "\x04\x05\x02\x0B\f\x0F\x0F\"\"\x05\x02\f\f\x0F\x0F", "`` \x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02", "\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02", "\x02\x03\x0B\x03\x02\x02\x02\x05\x0E\x03\x02\x02", "\x02\x07\x13\x03\x02\x02\x02\t\x1A\x03\x02\x02", "\x02\x0B\f\x07B\x02\x02\f\x04\x03\x02\x02\x02\r", "\x0F\x042;\x02\x0E\r\x03\x02\x02\x02\x0F\x10\x03", "\x02\x02\x02\x10\x0E\x03\x02\x02\x02\x10\x11\x03", "\x02\x02\x02\x11\x06\x03\x02\x02\x02\x12\x14\t", "\x02\x02\x02\x13\x12\x03\x02\x02\x02\x14\x15\x03", "\x02\x02\x02\x15\x13\x03\x02\x02\x02\x15\x16\x03", "\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x18\b", "\x04\x02\x02\x18\b\x03\x02\x02\x02\x19\x1B\t\x03", "\x02\x02\x1A\x19\x03\x02\x02\x02\x1B\x1C\x03\x02", "\x02\x02\x1C\x1A\x03\x02\x02\x02\x1C\x1D\x03\x02", "\x02\x02\x1D\n\x03\x02\x02\x02\x06\x02\x10\x15", "\x1C\x03\b\x02\x02"].join("");

	var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

	var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
	    return new antlr4.dfa.DFA(ds, index);
	});

	function ArtlingLexer(input) {
	    antlr4.Lexer.call(this, input);
	    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
	    return this;
	}

	ArtlingLexer.prototype = Object.create(antlr4.Lexer.prototype);
	ArtlingLexer.prototype.constructor = ArtlingLexer;

	ArtlingLexer.EOF = antlr4.Token.EOF;
	ArtlingLexer.AT = 1;
	ArtlingLexer.INT = 2;
	ArtlingLexer.WS = 3;
	ArtlingLexer.LINE = 4;

	ArtlingLexer.modeNames = ["DEFAULT_MODE"];

	ArtlingLexer.literalNames = [null, "'@'"];

	ArtlingLexer.symbolicNames = [null, "AT", "INT", "WS", "LINE"];

	ArtlingLexer.ruleNames = ["AT", "INT", "WS", "LINE"];

	ArtlingLexer.grammarFileName = "Artling.g4";

	exports.ArtlingLexer = ArtlingLexer;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Generated from Artling.g4 by ANTLR 4.5.2
	// jshint ignore: start
	var antlr4 = __webpack_require__(1);
	var ArtlingListener = __webpack_require__(48).ArtlingListener;
	var grammarFileName = "Artling.g4";

	var serializedATN = ['\x03\u0430\uD6D1\u8206\uAD2D\u4417\uAEF1\u8D80\uAADD', '\x03\x06\x11\x04\x02\t\x02\x04\x03\t\x03\x03\x02', '\x03\x02\x05\x02\t\n\x02\x03\x03\x03\x03\x05\x03', '\r\n\x03\x03\x03\x03\x03\x03\x03\x02\x02\x04\x02', '\x04\x02\x02\x10\x02\b\x03\x02\x02\x02\x04\n\x03', '\x02\x02\x02\x06\t\x05\x04\x03\x02\x07\t\x07\x05', '\x02\x02\b\x06\x03\x02\x02\x02\b\x07\x03\x02\x02', '\x02\t\x03\x03\x02\x02\x02\n\f\x07\x03\x02\x02\x0B', '\r\x07\x04\x02\x02\f\x0B\x03\x02\x02\x02\f\r\x03', '\x02\x02\x02\r\x0E\x03\x02\x02\x02\x0E\x0F\x07', '\x06\x02\x02\x0F\x05\x03\x02\x02\x02\x04\b\f'].join("");

	var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

	var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
	    return new antlr4.dfa.DFA(ds, index);
	});

	var sharedContextCache = new antlr4.PredictionContextCache();

	var literalNames = [null, "'@'"];

	var symbolicNames = [null, "AT", "INT", "WS", "LINE"];

	var ruleNames = ["content", "heading"];

	function ArtlingParser(input) {
	    antlr4.Parser.call(this, input);
	    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
	    this.ruleNames = ruleNames;
	    this.literalNames = literalNames;
	    this.symbolicNames = symbolicNames;
	    return this;
	}

	ArtlingParser.prototype = Object.create(antlr4.Parser.prototype);
	ArtlingParser.prototype.constructor = ArtlingParser;

	Object.defineProperty(ArtlingParser.prototype, "atn", {
	    get: function get() {
	        return atn;
	    }
	});

	ArtlingParser.EOF = antlr4.Token.EOF;
	ArtlingParser.AT = 1;
	ArtlingParser.INT = 2;
	ArtlingParser.WS = 3;
	ArtlingParser.LINE = 4;

	ArtlingParser.RULE_content = 0;
	ArtlingParser.RULE_heading = 1;

	function ContentContext(parser, parent, invokingState) {
	    if (parent === undefined) {
	        parent = null;
	    }
	    if (invokingState === undefined || invokingState === null) {
	        invokingState = -1;
	    }
	    antlr4.ParserRuleContext.call(this, parent, invokingState);
	    this.parser = parser;
	    this.ruleIndex = ArtlingParser.RULE_content;
	    return this;
	}

	ContentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
	ContentContext.prototype.constructor = ContentContext;

	ContentContext.prototype.heading = function () {
	    return this.getTypedRuleContext(HeadingContext, 0);
	};

	ContentContext.prototype.WS = function () {
	    return this.getToken(ArtlingParser.WS, 0);
	};

	ContentContext.prototype.enterRule = function (listener) {
	    if (listener instanceof ArtlingListener) {
	        listener.enterContent(this);
	    }
	};

	ContentContext.prototype.exitRule = function (listener) {
	    if (listener instanceof ArtlingListener) {
	        listener.exitContent(this);
	    }
	};

	ArtlingParser.ContentContext = ContentContext;

	ArtlingParser.prototype.content = function () {

	    var localctx = new ContentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ArtlingParser.RULE_content);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 6;
	        switch (this._input.LA(1)) {
	            case ArtlingParser.AT:
	                this.state = 4;
	                this.heading();
	                break;
	            case ArtlingParser.WS:
	                this.state = 5;
	                this.match(ArtlingParser.WS);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	        if (re instanceof antlr4.error.RecognitionException) {
	            localctx.exception = re;
	            this._errHandler.reportError(this, re);
	            this._errHandler.recover(this, re);
	        } else {
	            throw re;
	        }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	};

	function HeadingContext(parser, parent, invokingState) {
	    if (parent === undefined) {
	        parent = null;
	    }
	    if (invokingState === undefined || invokingState === null) {
	        invokingState = -1;
	    }
	    antlr4.ParserRuleContext.call(this, parent, invokingState);
	    this.parser = parser;
	    this.ruleIndex = ArtlingParser.RULE_heading;
	    return this;
	}

	HeadingContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
	HeadingContext.prototype.constructor = HeadingContext;

	HeadingContext.prototype.AT = function () {
	    return this.getToken(ArtlingParser.AT, 0);
	};

	HeadingContext.prototype.LINE = function () {
	    return this.getToken(ArtlingParser.LINE, 0);
	};

	HeadingContext.prototype.INT = function () {
	    return this.getToken(ArtlingParser.INT, 0);
	};

	HeadingContext.prototype.enterRule = function (listener) {
	    if (listener instanceof ArtlingListener) {
	        listener.enterHeading(this);
	    }
	};

	HeadingContext.prototype.exitRule = function (listener) {
	    if (listener instanceof ArtlingListener) {
	        listener.exitHeading(this);
	    }
	};

	ArtlingParser.HeadingContext = HeadingContext;

	ArtlingParser.prototype.heading = function () {

	    var localctx = new HeadingContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ArtlingParser.RULE_heading);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 8;
	        this.match(ArtlingParser.AT);
	        this.state = 10;
	        _la = this._input.LA(1);
	        if (_la === ArtlingParser.INT) {
	            this.state = 9;
	            this.match(ArtlingParser.INT);
	        }

	        this.state = 12;
	        this.match(ArtlingParser.LINE);
	    } catch (re) {
	        if (re instanceof antlr4.error.RecognitionException) {
	            localctx.exception = re;
	            this._errHandler.reportError(this, re);
	            this._errHandler.recover(this, re);
	        } else {
	            throw re;
	        }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	};

	exports.ArtlingParser = ArtlingParser;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Generated from Artling.g4 by ANTLR 4.5.2
	// jshint ignore: start
	var antlr4 = __webpack_require__(1);

	// This class defines a complete listener for a parse tree produced by ArtlingParser.
	function ArtlingListener() {
		antlr4.tree.ParseTreeListener.call(this);
		return this;
	}

	ArtlingListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
	ArtlingListener.prototype.constructor = ArtlingListener;

	// Enter a parse tree produced by ArtlingParser#content.
	ArtlingListener.prototype.enterContent = function (ctx) {};

	// Exit a parse tree produced by ArtlingParser#content.
	ArtlingListener.prototype.exitContent = function (ctx) {};

	// Enter a parse tree produced by ArtlingParser#heading.
	ArtlingListener.prototype.enterHeading = function (ctx) {};

	// Exit a parse tree produced by ArtlingParser#heading.
	ArtlingListener.prototype.exitHeading = function (ctx) {};

	exports.ArtlingListener = ArtlingListener;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(50);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Artling = function (_Component) {
	  _inherits(Artling, _Component);

	  function Artling() {
	    _classCallCheck(this, Artling);

	    return _possibleConstructorReturn(this, (Artling.__proto__ || Object.getPrototypeOf(Artling)).apply(this, arguments));
	  }

	  _createClass(Artling, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "artling" },
	        "Hello"
	      );
	    }
	  }]);

	  return Artling;
	}(_react.Component);

	exports.default = Artling;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(51);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(53);

	var ReactChildren = __webpack_require__(54);
	var ReactComponent = __webpack_require__(67);
	var ReactPureComponent = __webpack_require__(70);
	var ReactClass = __webpack_require__(71);
	var ReactDOMFactories = __webpack_require__(73);
	var ReactElement = __webpack_require__(58);
	var ReactPropTypes = __webpack_require__(78);
	var ReactVersion = __webpack_require__(79);

	var onlyChild = __webpack_require__(80);
	var warning = __webpack_require__(60);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(74);
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function __spread() {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,
	  PureComponent: ReactPureComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function createMixin(mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var PooledClass = __webpack_require__(55);
	var ReactElement = __webpack_require__(58);

	var emptyFunction = __webpack_require__(61);
	var traverseAllChildren = __webpack_require__(64);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;

	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(56);

	var invariant = __webpack_require__(57);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function oneArgumentPooler(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function twoArgumentPooler(a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function threeArgumentPooler(a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function fourArgumentPooler(a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function fiveArgumentPooler(a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function standardReleaser(instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function addPoolingTo(CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _assign = __webpack_require__(53);

	var ReactCurrentOwner = __webpack_require__(59);

	var warning = __webpack_require__(60);
	var canDefineProperty = __webpack_require__(62);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var REACT_ELEMENT_TYPE = __webpack_require__(63);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	function hasValidRef(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function warnAboutAccessingKey() {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function warnAboutAccessingRef() {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(61);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    // $FlowFixMe https://github.com/facebook/flow/issues/285
	    Object.defineProperty({}, 'x', { get: function get() {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.

	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	module.exports = REACT_ELEMENT_TYPE;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _prodInvariant = __webpack_require__(56);

	var ReactCurrentOwner = __webpack_require__(59);
	var REACT_ELEMENT_TYPE = __webpack_require__(63);

	var getIteratorFn = __webpack_require__(65);
	var invariant = __webpack_require__(57);
	var KeyEscapeUtils = __webpack_require__(66);
	var warning = __webpack_require__(60);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * This is inlined from ReactElement since this file is shared between
	 * isomorphic and renderers. We could extract this to a
	 *
	 */

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && (typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' ||
	  // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _prodInvariant = __webpack_require__(56);

	var ReactNoopUpdateQueue = __webpack_require__(68);

	var canDefineProperty = __webpack_require__(62);
	var emptyObject = __webpack_require__(69);
	var invariant = __webpack_require__(57);
	var warning = __webpack_require__(60);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var warning = __webpack_require__(60);

	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function isMounted(publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function enqueueCallback(publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function enqueueForceUpdate(publicInstance) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function enqueueSetState(publicInstance, partialState) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(53);

	var ReactComponent = __webpack_require__(67);
	var ReactNoopUpdateQueue = __webpack_require__(68);

	var emptyObject = __webpack_require__(69);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	function ComponentDummy() {}
	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(ReactPureComponent.prototype, ReactComponent.prototype);
	ReactPureComponent.prototype.isPureReactComponent = true;

	module.exports = ReactPureComponent;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _prodInvariant = __webpack_require__(56),
	    _assign = __webpack_require__(53);

	var ReactComponent = __webpack_require__(67);
	var ReactElement = __webpack_require__(58);
	var ReactPropTypeLocationNames = __webpack_require__(72);
	var ReactNoopUpdateQueue = __webpack_require__(68);

	var emptyObject = __webpack_require__(69);
	var invariant = __webpack_require__(57);
	var warning = __webpack_require__(60);

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or host components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: 'DEFINE_MANY',

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: 'DEFINE_MANY',

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: 'DEFINE_MANY',

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: 'DEFINE_MANY_MERGED',

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: 'DEFINE_MANY_MERGED',

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: 'DEFINE_MANY_MERGED',

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: 'DEFINE_ONCE',

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: 'DEFINE_MANY',

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: 'DEFINE_MANY',

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: 'DEFINE_MANY',

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: 'DEFINE_ONCE',

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: 'DEFINE_MANY',

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: 'OVERRIDE_BASE'

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function displayName(Constructor, _displayName) {
	    Constructor.displayName = _displayName;
	  },
	  mixins: function mixins(Constructor, _mixins) {
	    if (_mixins) {
	      for (var i = 0; i < _mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, _mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function childContextTypes(Constructor, _childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, _childContextTypes, 'childContext');
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, _childContextTypes);
	  },
	  contextTypes: function contextTypes(Constructor, _contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, _contextTypes, 'context');
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, _contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function getDefaultProps(Constructor, _getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, _getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = _getDefaultProps;
	    }
	  },
	  propTypes: function propTypes(Constructor, _propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, _propTypes, 'prop');
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, _propTypes);
	  },
	  statics: function statics(Constructor, _statics) {
	    mixStaticSpecIntoComponent(Constructor, _statics);
	  },
	  autobind: function autobind() {} };

	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    if (process.env.NODE_ENV !== 'production') {
	      var typeofSpec = typeof spec === 'undefined' ? 'undefined' : _typeof(spec);
	      var isMixinValid = typeofSpec === 'object' && spec !== null;

	      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
	    }

	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === 'DEFINE_MANY_MERGED') {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === 'DEFINE_MANY') {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && (typeof one === 'undefined' ? 'undefined' : _typeof(one)) === 'object' && (typeof two === 'undefined' ? 'undefined' : _typeof(two)) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function replaceState(newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function isMounted() {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function ReactClassComponent() {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function injectMixin(mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(74);
	  createDOMFactory = ReactElementValidator.createFactory;
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),

	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ReactCurrentOwner = __webpack_require__(59);
	var ReactComponentTreeHook = __webpack_require__(75);
	var ReactElement = __webpack_require__(58);

	var checkReactTypeSpec = __webpack_require__(76);

	var canDefineProperty = __webpack_require__(62);
	var getIteratorFn = __webpack_require__(65);
	var warning = __webpack_require__(60);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (memoizer[currentComponentErrorInfo]) {
	    return;
	  }
	  memoizer[currentComponentErrorInfo] = true;

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function createElement(type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    if (!validType) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
	    }

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function createFactory(type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function cloneElement(element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _prodInvariant = __webpack_require__(56);

	var ReactCurrentOwner = __webpack_require__(59);

	var invariant = __webpack_require__(57);
	var warning = __webpack_require__(60);

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty)
	  // Strip regex characters so we can use it for regex
	  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  // Remove hasOwnProperty from the template to make it generic
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	var setItem;
	var getItem;
	var removeItem;
	var getItemIDs;
	var addRoot;
	var removeRoot;
	var getRootIDs;

	if (canUseCollections) {
	  var itemMap = new Map();
	  var rootIDSet = new Set();

	  setItem = function setItem(id, item) {
	    itemMap.set(id, item);
	  };
	  getItem = function getItem(id) {
	    return itemMap.get(id);
	  };
	  removeItem = function removeItem(id) {
	    itemMap['delete'](id);
	  };
	  getItemIDs = function getItemIDs() {
	    return Array.from(itemMap.keys());
	  };

	  addRoot = function addRoot(id) {
	    rootIDSet.add(id);
	  };
	  removeRoot = function removeRoot(id) {
	    rootIDSet['delete'](id);
	  };
	  getRootIDs = function getRootIDs() {
	    return Array.from(rootIDSet.keys());
	  };
	} else {
	  var itemByKey = {};
	  var rootByKey = {};

	  // Use non-numeric keys to prevent V8 performance issues:
	  // https://github.com/facebook/react/pull/7232
	  var getKeyFromID = function getKeyFromID(id) {
	    return '.' + id;
	  };
	  var getIDFromKey = function getIDFromKey(key) {
	    return parseInt(key.substr(1), 10);
	  };

	  setItem = function setItem(id, item) {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  };
	  getItem = function getItem(id) {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  };
	  removeItem = function removeItem(id) {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  };
	  getItemIDs = function getItemIDs() {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  };

	  addRoot = function addRoot(id) {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  };
	  removeRoot = function removeRoot(id) {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  };
	  getRootIDs = function getRootIDs() {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  };
	}

	var unmountedIDs = [];

	function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}

	function _getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}

	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}

	var ReactComponentTreeHook = {
	  onSetChildren: function onSetChildren(id, nextChildIDs) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = getItem(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || _typeof(nextChild.element) !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent id is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function onBeforeMountComponent(id, element, parentID) {
	    var item = {
	      element: element,
	      parentID: parentID,
	      text: null,
	      childIDs: [],
	      isMounted: false,
	      updateCount: 0
	    };
	    setItem(id, item);
	  },
	  onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function onMountComponent(id) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function onUpdateComponent(id) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function onUnmountComponent(id) {
	    var item = getItem(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function purgeUnmountedComponents() {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function isMounted(id) {
	    var item = getItem(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function getCurrentStackAddendum(topElement) {
	    var info = '';
	    if (topElement) {
	      var name = _getDisplayName(topElement);
	      var owner = topElement._owner;
	      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
	    }

	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;

	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function getStackAddendumByID(id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function getChildIDs(id) {
	    var item = getItem(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function getDisplayName(id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return _getDisplayName(element);
	  },
	  getElement: function getElement(id) {
	    var item = getItem(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function getOwnerID(id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function getParentID(id) {
	    var item = getItem(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function getSource(id) {
	    var item = getItem(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function getText(id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function getUpdateCount(id) {
	    var item = getItem(id);
	    return item ? item.updateCount : 0;
	  },

	  getRootIDs: getRootIDs,
	  getRegisteredIDs: getItemIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _prodInvariant = __webpack_require__(56);

	var ReactPropTypeLocationNames = __webpack_require__(72);
	var ReactPropTypesSecret = __webpack_require__(77);

	var invariant = __webpack_require__(57);
	var warning = __webpack_require__(60);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(75);
	}

	var loggedTypeFailures = {};

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error)) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var componentStackInfo = '';

	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(75);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }

	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}

	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ReactElement = __webpack_require__(58);
	var ReactPropTypeLocationNames = __webpack_require__(72);
	var ReactPropTypesSecret = __webpack_require__(77);

	var emptyFunction = __webpack_require__(61);
	var getIteratorFn = __webpack_require__(65);
	var warning = __webpack_require__(60);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	  symbol: createPrimitiveTypeChecker('symbol'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */
	function PropTypeError(message) {
	  this.message = message;
	  this.stack = '';
	}
	// Make `instanceof Error` still work for returned errors.
	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
	  if (process.env.NODE_ENV !== 'production') {
	    var manualPropTypeCallCache = {};
	  }
	  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (process.env.NODE_ENV !== 'production') {
	      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
	        var cacheKey = componentName + ':' + propName;
	        if (!manualPropTypeCallCache[cacheKey]) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
	          manualPropTypeCallCache[cacheKey] = true;
	        }
	      }
	    }
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        if (props[propName] === null) {
	          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	        }
	        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName, secret) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    if (!ReactElement.isValidElement(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	module.exports = '15.4.1';

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	'use strict';

	var _prodInvariant = __webpack_require__(56);

	var ReactElement = __webpack_require__(58);

	var invariant = __webpack_require__(57);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ }
/******/ ]);