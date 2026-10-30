
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PQLListener } from "./PQLListener.js";
import { PQLVisitor } from "./PQLVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class PQLParser extends antlr.Parser {
    public static readonly AND = 1;
    public static readonly OR = 2;
    public static readonly NOT = 3;
    public static readonly IN = 4;
    public static readonly IS = 5;
    public static readonly NULL = 6;
    public static readonly CF = 7;
    public static readonly NEQ = 8;
    public static readonly GTE = 9;
    public static readonly LTE = 10;
    public static readonly EQ = 11;
    public static readonly GT = 12;
    public static readonly LT = 13;
    public static readonly TILDE = 14;
    public static readonly LPAREN = 15;
    public static readonly RPAREN = 16;
    public static readonly LBRACKET = 17;
    public static readonly RBRACKET = 18;
    public static readonly COMMA = 19;
    public static readonly PLUS = 20;
    public static readonly MINUS = 21;
    public static readonly STRING = 22;
    public static readonly DURATION = 23;
    public static readonly NUMBER = 24;
    public static readonly IDENT = 25;
    public static readonly WS = 26;
    public static readonly RULE_query = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_orExpr = 2;
    public static readonly RULE_andExpr = 3;
    public static readonly RULE_notExpr = 4;
    public static readonly RULE_primary = 5;
    public static readonly RULE_predicate = 6;
    public static readonly RULE_fieldName = 7;
    public static readonly RULE_customPropertyPredicate = 8;
    public static readonly RULE_propertyReference = 9;
    public static readonly RULE_conditionFunction = 10;
    public static readonly RULE_functionName = 11;
    public static readonly RULE_callArguments = 12;
    public static readonly RULE_comparison = 13;
    public static readonly RULE_listOperand = 14;
    public static readonly RULE_operator = 15;
    public static readonly RULE_valueList = 16;
    public static readonly RULE_arguments = 17;
    public static readonly RULE_value = 18;
    public static readonly RULE_valueFunction = 19;
    public static readonly RULE_durationOffset = 20;
    public static readonly RULE_sign = 21;

    public static readonly literalNames = [
        null, "'and'", "'or'", "'not'", "'in'", "'is'", "'null'", "'cf'", 
        "'!='", "'>='", "'<='", "'='", "'>'", "'<'", "'~'", "'('", "')'", 
        "'['", "']'", "','", "'+'", "'-'"
    ];

    public static readonly symbolicNames = [
        null, "AND", "OR", "NOT", "IN", "IS", "NULL", "CF", "NEQ", "GTE", 
        "LTE", "EQ", "GT", "LT", "TILDE", "LPAREN", "RPAREN", "LBRACKET", 
        "RBRACKET", "COMMA", "PLUS", "MINUS", "STRING", "DURATION", "NUMBER", 
        "IDENT", "WS"
    ];
    public static readonly ruleNames = [
        "query", "expression", "orExpr", "andExpr", "notExpr", "primary", 
        "predicate", "fieldName", "customPropertyPredicate", "propertyReference", 
        "conditionFunction", "functionName", "callArguments", "comparison", 
        "listOperand", "operator", "valueList", "arguments", "value", "valueFunction", 
        "durationOffset", "sign",
    ];

    public get grammarFileName(): string { return "PQL.g4"; }
    public get literalNames(): (string | null)[] { return PQLParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return PQLParser.symbolicNames; }
    public get ruleNames(): string[] { return PQLParser.ruleNames; }
    public get serializedATN(): number[] { return PQLParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, PQLParser._ATN, PQLParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public query(): QueryContext {
        let localContext = new QueryContext(this.context, this.state);
        this.enterRule(localContext, 0, PQLParser.RULE_query);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 44;
            this.expression();
            this.state = 45;
            this.match(PQLParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 2, PQLParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 47;
            this.orExpr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orExpr(): OrExprContext {
        let localContext = new OrExprContext(this.context, this.state);
        this.enterRule(localContext, 4, PQLParser.RULE_orExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 49;
            this.andExpr();
            this.state = 54;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 50;
                this.match(PQLParser.OR);
                this.state = 51;
                this.andExpr();
                }
                }
                this.state = 56;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andExpr(): AndExprContext {
        let localContext = new AndExprContext(this.context, this.state);
        this.enterRule(localContext, 6, PQLParser.RULE_andExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 57;
            this.notExpr();
            this.state = 62;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 1) {
                {
                {
                this.state = 58;
                this.match(PQLParser.AND);
                this.state = 59;
                this.notExpr();
                }
                }
                this.state = 64;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public notExpr(): NotExprContext {
        let localContext = new NotExprContext(this.context, this.state);
        this.enterRule(localContext, 8, PQLParser.RULE_notExpr);
        try {
            this.state = 68;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PQLParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 65;
                this.match(PQLParser.NOT);
                this.state = 66;
                this.notExpr();
                }
                break;
            case PQLParser.CF:
            case PQLParser.LPAREN:
            case PQLParser.IDENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 67;
                this.primary();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primary(): PrimaryContext {
        let localContext = new PrimaryContext(this.context, this.state);
        this.enterRule(localContext, 10, PQLParser.RULE_primary);
        try {
            this.state = 76;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PQLParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 70;
                this.match(PQLParser.LPAREN);
                this.state = 71;
                this.expression();
                this.state = 72;
                this.match(PQLParser.RPAREN);
                }
                break;
            case PQLParser.IDENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 74;
                this.predicate();
                }
                break;
            case PQLParser.CF:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 75;
                this.customPropertyPredicate();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public predicate(): PredicateContext {
        let localContext = new PredicateContext(this.context, this.state);
        this.enterRule(localContext, 12, PQLParser.RULE_predicate);
        try {
            this.state = 82;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 78;
                this.fieldName();
                this.state = 79;
                this.comparison();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 81;
                this.conditionFunction();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldName(): FieldNameContext {
        let localContext = new FieldNameContext(this.context, this.state);
        this.enterRule(localContext, 14, PQLParser.RULE_fieldName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 84;
            this.match(PQLParser.IDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public customPropertyPredicate(): CustomPropertyPredicateContext {
        let localContext = new CustomPropertyPredicateContext(this.context, this.state);
        this.enterRule(localContext, 16, PQLParser.RULE_customPropertyPredicate);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 86;
            this.match(PQLParser.CF);
            this.state = 87;
            this.match(PQLParser.LBRACKET);
            this.state = 88;
            this.propertyReference();
            this.state = 89;
            this.match(PQLParser.RBRACKET);
            this.state = 90;
            this.comparison();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertyReference(): PropertyReferenceContext {
        let localContext = new PropertyReferenceContext(this.context, this.state);
        this.enterRule(localContext, 18, PQLParser.RULE_propertyReference);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 92;
            this.match(PQLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionFunction(): ConditionFunctionContext {
        let localContext = new ConditionFunctionContext(this.context, this.state);
        this.enterRule(localContext, 20, PQLParser.RULE_conditionFunction);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 94;
            this.functionName();
            this.state = 95;
            this.callArguments();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public functionName(): FunctionNameContext {
        let localContext = new FunctionNameContext(this.context, this.state);
        this.enterRule(localContext, 22, PQLParser.RULE_functionName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 97;
            this.match(PQLParser.IDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public callArguments(): CallArgumentsContext {
        let localContext = new CallArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 24, PQLParser.RULE_callArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 99;
            this.match(PQLParser.LPAREN);
            this.state = 101;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 56623104) !== 0)) {
                {
                this.state = 100;
                this.arguments();
                }
            }

            this.state = 103;
            this.match(PQLParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparison(): ComparisonContext {
        let localContext = new ComparisonContext(this.context, this.state);
        this.enterRule(localContext, 26, PQLParser.RULE_comparison);
        let _la: number;
        try {
            this.state = 118;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PQLParser.NEQ:
            case PQLParser.GTE:
            case PQLParser.LTE:
            case PQLParser.EQ:
            case PQLParser.GT:
            case PQLParser.LT:
            case PQLParser.TILDE:
                localContext = new CompareOperatorContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 105;
                this.operator();
                this.state = 106;
                this.value();
                }
                break;
            case PQLParser.IN:
                localContext = new InListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 108;
                this.match(PQLParser.IN);
                this.state = 109;
                this.listOperand();
                }
                break;
            case PQLParser.NOT:
                localContext = new NotInListContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 110;
                this.match(PQLParser.NOT);
                this.state = 111;
                this.match(PQLParser.IN);
                this.state = 112;
                this.listOperand();
                }
                break;
            case PQLParser.IS:
                localContext = new IsNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 113;
                this.match(PQLParser.IS);
                this.state = 115;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3) {
                    {
                    this.state = 114;
                    this.match(PQLParser.NOT);
                    }
                }

                this.state = 117;
                this.match(PQLParser.NULL);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public listOperand(): ListOperandContext {
        let localContext = new ListOperandContext(this.context, this.state);
        this.enterRule(localContext, 28, PQLParser.RULE_listOperand);
        try {
            this.state = 122;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PQLParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 120;
                this.valueList();
                }
                break;
            case PQLParser.IDENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 121;
                this.valueFunction();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public operator(): OperatorContext {
        let localContext = new OperatorContext(this.context, this.state);
        this.enterRule(localContext, 30, PQLParser.RULE_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 124;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 32512) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueList(): ValueListContext {
        let localContext = new ValueListContext(this.context, this.state);
        this.enterRule(localContext, 32, PQLParser.RULE_valueList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 126;
            this.match(PQLParser.LPAREN);
            this.state = 135;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 56623104) !== 0)) {
                {
                this.state = 127;
                this.value();
                this.state = 132;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 19) {
                    {
                    {
                    this.state = 128;
                    this.match(PQLParser.COMMA);
                    this.state = 129;
                    this.value();
                    }
                    }
                    this.state = 134;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 137;
            this.match(PQLParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arguments(): ArgumentsContext {
        let localContext = new ArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 34, PQLParser.RULE_arguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 139;
            this.value();
            this.state = 144;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 19) {
                {
                {
                this.state = 140;
                this.match(PQLParser.COMMA);
                this.state = 141;
                this.value();
                }
                }
                this.state = 146;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public value(): ValueContext {
        let localContext = new ValueContext(this.context, this.state);
        this.enterRule(localContext, 36, PQLParser.RULE_value);
        let _la: number;
        try {
            this.state = 160;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                localContext = new StringValueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.match(PQLParser.STRING);
                }
                break;
            case 2:
                localContext = new NumberValueContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 149;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 21) {
                    {
                    this.state = 148;
                    this.match(PQLParser.MINUS);
                    }
                }

                this.state = 151;
                this.match(PQLParser.NUMBER);
                }
                break;
            case 3:
                localContext = new IdentValueContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 152;
                this.match(PQLParser.IDENT);
                }
                break;
            case 4:
                localContext = new FunctionValueContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 153;
                this.valueFunction();
                this.state = 157;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 20 || _la === 21) {
                    {
                    {
                    this.state = 154;
                    this.durationOffset();
                    }
                    }
                    this.state = 159;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueFunction(): ValueFunctionContext {
        let localContext = new ValueFunctionContext(this.context, this.state);
        this.enterRule(localContext, 38, PQLParser.RULE_valueFunction);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 162;
            this.functionName();
            this.state = 163;
            this.callArguments();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public durationOffset(): DurationOffsetContext {
        let localContext = new DurationOffsetContext(this.context, this.state);
        this.enterRule(localContext, 40, PQLParser.RULE_durationOffset);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 165;
            this.sign();
            this.state = 166;
            this.match(PQLParser.DURATION);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sign(): SignContext {
        let localContext = new SignContext(this.context, this.state);
        this.enterRule(localContext, 42, PQLParser.RULE_sign);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            _la = this.tokenStream.LA(1);
            if(!(_la === 20 || _la === 21)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,26,171,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,5,2,53,8,2,10,2,12,
        2,56,9,2,1,3,1,3,1,3,5,3,61,8,3,10,3,12,3,64,9,3,1,4,1,4,1,4,3,4,
        69,8,4,1,5,1,5,1,5,1,5,1,5,1,5,3,5,77,8,5,1,6,1,6,1,6,1,6,3,6,83,
        8,6,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,10,1,10,1,10,1,11,
        1,11,1,12,1,12,3,12,102,8,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,3,13,116,8,13,1,13,3,13,119,8,13,1,14,1,
        14,3,14,123,8,14,1,15,1,15,1,16,1,16,1,16,1,16,5,16,131,8,16,10,
        16,12,16,134,9,16,3,16,136,8,16,1,16,1,16,1,17,1,17,1,17,5,17,143,
        8,17,10,17,12,17,146,9,17,1,18,1,18,3,18,150,8,18,1,18,1,18,1,18,
        1,18,5,18,156,8,18,10,18,12,18,159,9,18,3,18,161,8,18,1,19,1,19,
        1,19,1,20,1,20,1,20,1,21,1,21,1,21,0,0,22,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,0,2,1,0,8,14,1,0,20,21,168,
        0,44,1,0,0,0,2,47,1,0,0,0,4,49,1,0,0,0,6,57,1,0,0,0,8,68,1,0,0,0,
        10,76,1,0,0,0,12,82,1,0,0,0,14,84,1,0,0,0,16,86,1,0,0,0,18,92,1,
        0,0,0,20,94,1,0,0,0,22,97,1,0,0,0,24,99,1,0,0,0,26,118,1,0,0,0,28,
        122,1,0,0,0,30,124,1,0,0,0,32,126,1,0,0,0,34,139,1,0,0,0,36,160,
        1,0,0,0,38,162,1,0,0,0,40,165,1,0,0,0,42,168,1,0,0,0,44,45,3,2,1,
        0,45,46,5,0,0,1,46,1,1,0,0,0,47,48,3,4,2,0,48,3,1,0,0,0,49,54,3,
        6,3,0,50,51,5,2,0,0,51,53,3,6,3,0,52,50,1,0,0,0,53,56,1,0,0,0,54,
        52,1,0,0,0,54,55,1,0,0,0,55,5,1,0,0,0,56,54,1,0,0,0,57,62,3,8,4,
        0,58,59,5,1,0,0,59,61,3,8,4,0,60,58,1,0,0,0,61,64,1,0,0,0,62,60,
        1,0,0,0,62,63,1,0,0,0,63,7,1,0,0,0,64,62,1,0,0,0,65,66,5,3,0,0,66,
        69,3,8,4,0,67,69,3,10,5,0,68,65,1,0,0,0,68,67,1,0,0,0,69,9,1,0,0,
        0,70,71,5,15,0,0,71,72,3,2,1,0,72,73,5,16,0,0,73,77,1,0,0,0,74,77,
        3,12,6,0,75,77,3,16,8,0,76,70,1,0,0,0,76,74,1,0,0,0,76,75,1,0,0,
        0,77,11,1,0,0,0,78,79,3,14,7,0,79,80,3,26,13,0,80,83,1,0,0,0,81,
        83,3,20,10,0,82,78,1,0,0,0,82,81,1,0,0,0,83,13,1,0,0,0,84,85,5,25,
        0,0,85,15,1,0,0,0,86,87,5,7,0,0,87,88,5,17,0,0,88,89,3,18,9,0,89,
        90,5,18,0,0,90,91,3,26,13,0,91,17,1,0,0,0,92,93,5,22,0,0,93,19,1,
        0,0,0,94,95,3,22,11,0,95,96,3,24,12,0,96,21,1,0,0,0,97,98,5,25,0,
        0,98,23,1,0,0,0,99,101,5,15,0,0,100,102,3,34,17,0,101,100,1,0,0,
        0,101,102,1,0,0,0,102,103,1,0,0,0,103,104,5,16,0,0,104,25,1,0,0,
        0,105,106,3,30,15,0,106,107,3,36,18,0,107,119,1,0,0,0,108,109,5,
        4,0,0,109,119,3,28,14,0,110,111,5,3,0,0,111,112,5,4,0,0,112,119,
        3,28,14,0,113,115,5,5,0,0,114,116,5,3,0,0,115,114,1,0,0,0,115,116,
        1,0,0,0,116,117,1,0,0,0,117,119,5,6,0,0,118,105,1,0,0,0,118,108,
        1,0,0,0,118,110,1,0,0,0,118,113,1,0,0,0,119,27,1,0,0,0,120,123,3,
        32,16,0,121,123,3,38,19,0,122,120,1,0,0,0,122,121,1,0,0,0,123,29,
        1,0,0,0,124,125,7,0,0,0,125,31,1,0,0,0,126,135,5,15,0,0,127,132,
        3,36,18,0,128,129,5,19,0,0,129,131,3,36,18,0,130,128,1,0,0,0,131,
        134,1,0,0,0,132,130,1,0,0,0,132,133,1,0,0,0,133,136,1,0,0,0,134,
        132,1,0,0,0,135,127,1,0,0,0,135,136,1,0,0,0,136,137,1,0,0,0,137,
        138,5,16,0,0,138,33,1,0,0,0,139,144,3,36,18,0,140,141,5,19,0,0,141,
        143,3,36,18,0,142,140,1,0,0,0,143,146,1,0,0,0,144,142,1,0,0,0,144,
        145,1,0,0,0,145,35,1,0,0,0,146,144,1,0,0,0,147,161,5,22,0,0,148,
        150,5,21,0,0,149,148,1,0,0,0,149,150,1,0,0,0,150,151,1,0,0,0,151,
        161,5,24,0,0,152,161,5,25,0,0,153,157,3,38,19,0,154,156,3,40,20,
        0,155,154,1,0,0,0,156,159,1,0,0,0,157,155,1,0,0,0,157,158,1,0,0,
        0,158,161,1,0,0,0,159,157,1,0,0,0,160,147,1,0,0,0,160,149,1,0,0,
        0,160,152,1,0,0,0,160,153,1,0,0,0,161,37,1,0,0,0,162,163,3,22,11,
        0,163,164,3,24,12,0,164,39,1,0,0,0,165,166,3,42,21,0,166,167,5,23,
        0,0,167,41,1,0,0,0,168,169,7,1,0,0,169,43,1,0,0,0,15,54,62,68,76,
        82,101,115,118,122,132,135,144,149,157,160
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!PQLParser.__ATN) {
            PQLParser.__ATN = new antlr.ATNDeserializer().deserialize(PQLParser._serializedATN);
        }

        return PQLParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(PQLParser.literalNames, PQLParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return PQLParser.vocabulary;
    }

    private static readonly decisionsToDFA = PQLParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class QueryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(PQLParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_query;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterQuery) {
             listener.enterQuery(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitQuery) {
             listener.exitQuery(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitQuery) {
            return visitor.visitQuery(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public orExpr(): OrExprContext {
        return this.getRuleContext(0, OrExprContext)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_expression;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OrExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andExpr(): AndExprContext[];
    public andExpr(i: number): AndExprContext | null;
    public andExpr(i?: number): AndExprContext[] | AndExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndExprContext);
        }

        return this.getRuleContext(i, AndExprContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PQLParser.OR);
    	} else {
    		return this.getToken(PQLParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_orExpr;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterOrExpr) {
             listener.enterOrExpr(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitOrExpr) {
             listener.exitOrExpr(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitOrExpr) {
            return visitor.visitOrExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AndExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public notExpr(): NotExprContext[];
    public notExpr(i: number): NotExprContext | null;
    public notExpr(i?: number): NotExprContext[] | NotExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(NotExprContext);
        }

        return this.getRuleContext(i, NotExprContext);
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PQLParser.AND);
    	} else {
    		return this.getToken(PQLParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_andExpr;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterAndExpr) {
             listener.enterAndExpr(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitAndExpr) {
             listener.exitAndExpr(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitAndExpr) {
            return visitor.visitAndExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NotExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.NOT, 0);
    }
    public notExpr(): NotExprContext | null {
        return this.getRuleContext(0, NotExprContext);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_notExpr;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterNotExpr) {
             listener.enterNotExpr(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitNotExpr) {
             listener.exitNotExpr(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitNotExpr) {
            return visitor.visitNotExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.RPAREN, 0);
    }
    public predicate(): PredicateContext | null {
        return this.getRuleContext(0, PredicateContext);
    }
    public customPropertyPredicate(): CustomPropertyPredicateContext | null {
        return this.getRuleContext(0, CustomPropertyPredicateContext);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_primary;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterPrimary) {
             listener.enterPrimary(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitPrimary) {
             listener.exitPrimary(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitPrimary) {
            return visitor.visitPrimary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PredicateContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fieldName(): FieldNameContext | null {
        return this.getRuleContext(0, FieldNameContext);
    }
    public comparison(): ComparisonContext | null {
        return this.getRuleContext(0, ComparisonContext);
    }
    public conditionFunction(): ConditionFunctionContext | null {
        return this.getRuleContext(0, ConditionFunctionContext);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_predicate;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterPredicate) {
             listener.enterPredicate(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitPredicate) {
             listener.exitPredicate(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitPredicate) {
            return visitor.visitPredicate(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FieldNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENT(): antlr.TerminalNode {
        return this.getToken(PQLParser.IDENT, 0)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_fieldName;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterFieldName) {
             listener.enterFieldName(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitFieldName) {
             listener.exitFieldName(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitFieldName) {
            return visitor.visitFieldName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CustomPropertyPredicateContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CF(): antlr.TerminalNode {
        return this.getToken(PQLParser.CF, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(PQLParser.LBRACKET, 0)!;
    }
    public propertyReference(): PropertyReferenceContext {
        return this.getRuleContext(0, PropertyReferenceContext)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(PQLParser.RBRACKET, 0)!;
    }
    public comparison(): ComparisonContext {
        return this.getRuleContext(0, ComparisonContext)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_customPropertyPredicate;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterCustomPropertyPredicate) {
             listener.enterCustomPropertyPredicate(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitCustomPropertyPredicate) {
             listener.exitCustomPropertyPredicate(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitCustomPropertyPredicate) {
            return visitor.visitCustomPropertyPredicate(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropertyReferenceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(PQLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_propertyReference;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterPropertyReference) {
             listener.enterPropertyReference(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitPropertyReference) {
             listener.exitPropertyReference(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitPropertyReference) {
            return visitor.visitPropertyReference(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionFunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionName(): FunctionNameContext {
        return this.getRuleContext(0, FunctionNameContext)!;
    }
    public callArguments(): CallArgumentsContext {
        return this.getRuleContext(0, CallArgumentsContext)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_conditionFunction;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterConditionFunction) {
             listener.enterConditionFunction(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitConditionFunction) {
             listener.exitConditionFunction(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitConditionFunction) {
            return visitor.visitConditionFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENT(): antlr.TerminalNode {
        return this.getToken(PQLParser.IDENT, 0)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_functionName;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterFunctionName) {
             listener.enterFunctionName(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitFunctionName) {
             listener.exitFunctionName(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitFunctionName) {
            return visitor.visitFunctionName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CallArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(PQLParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(PQLParser.RPAREN, 0)!;
    }
    public arguments(): ArgumentsContext | null {
        return this.getRuleContext(0, ArgumentsContext);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_callArguments;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterCallArguments) {
             listener.enterCallArguments(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitCallArguments) {
             listener.exitCallArguments(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitCallArguments) {
            return visitor.visitCallArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_comparison;
    }
    public override copyFrom(ctx: ComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class CompareOperatorContext extends ComparisonContext {
    public constructor(ctx: ComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public operator(): OperatorContext {
        return this.getRuleContext(0, OperatorContext)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterCompareOperator) {
             listener.enterCompareOperator(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitCompareOperator) {
             listener.exitCompareOperator(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitCompareOperator) {
            return visitor.visitCompareOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InListContext extends ComparisonContext {
    public constructor(ctx: ComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(PQLParser.IN, 0)!;
    }
    public listOperand(): ListOperandContext {
        return this.getRuleContext(0, ListOperandContext)!;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterInList) {
             listener.enterInList(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitInList) {
             listener.exitInList(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitInList) {
            return visitor.visitInList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NotInListContext extends ComparisonContext {
    public constructor(ctx: ComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NOT(): antlr.TerminalNode {
        return this.getToken(PQLParser.NOT, 0)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(PQLParser.IN, 0)!;
    }
    public listOperand(): ListOperandContext {
        return this.getRuleContext(0, ListOperandContext)!;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterNotInList) {
             listener.enterNotInList(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitNotInList) {
             listener.exitNotInList(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitNotInList) {
            return visitor.visitNotInList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IsNullContext extends ComparisonContext {
    public constructor(ctx: ComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IS(): antlr.TerminalNode {
        return this.getToken(PQLParser.IS, 0)!;
    }
    public NULL(): antlr.TerminalNode {
        return this.getToken(PQLParser.NULL, 0)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.NOT, 0);
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterIsNull) {
             listener.enterIsNull(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitIsNull) {
             listener.exitIsNull(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitIsNull) {
            return visitor.visitIsNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ListOperandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public valueList(): ValueListContext | null {
        return this.getRuleContext(0, ValueListContext);
    }
    public valueFunction(): ValueFunctionContext | null {
        return this.getRuleContext(0, ValueFunctionContext);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_listOperand;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterListOperand) {
             listener.enterListOperand(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitListOperand) {
             listener.exitListOperand(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitListOperand) {
            return visitor.visitListOperand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.NEQ, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.GT, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.GTE, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.LT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.LTE, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.TILDE, 0);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_operator;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterOperator) {
             listener.enterOperator(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitOperator) {
             listener.exitOperator(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitOperator) {
            return visitor.visitOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(PQLParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(PQLParser.RPAREN, 0)!;
    }
    public value(): ValueContext[];
    public value(i: number): ValueContext | null;
    public value(i?: number): ValueContext[] | ValueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }

        return this.getRuleContext(i, ValueContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PQLParser.COMMA);
    	} else {
    		return this.getToken(PQLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_valueList;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterValueList) {
             listener.enterValueList(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitValueList) {
             listener.exitValueList(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitValueList) {
            return visitor.visitValueList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public value(): ValueContext[];
    public value(i: number): ValueContext | null;
    public value(i?: number): ValueContext[] | ValueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }

        return this.getRuleContext(i, ValueContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PQLParser.COMMA);
    	} else {
    		return this.getToken(PQLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_arguments;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterArguments) {
             listener.enterArguments(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitArguments) {
             listener.exitArguments(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitArguments) {
            return visitor.visitArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_value;
    }
    public override copyFrom(ctx: ValueContext): void {
        super.copyFrom(ctx);
    }
}
export class StringValueContext extends ValueContext {
    public constructor(ctx: ValueContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(PQLParser.STRING, 0)!;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterStringValue) {
             listener.enterStringValue(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitStringValue) {
             listener.exitStringValue(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitStringValue) {
            return visitor.visitStringValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NumberValueContext extends ValueContext {
    public constructor(ctx: ValueContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(PQLParser.NUMBER, 0)!;
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.MINUS, 0);
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterNumberValue) {
             listener.enterNumberValue(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitNumberValue) {
             listener.exitNumberValue(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitNumberValue) {
            return visitor.visitNumberValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentValueContext extends ValueContext {
    public constructor(ctx: ValueContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENT(): antlr.TerminalNode {
        return this.getToken(PQLParser.IDENT, 0)!;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterIdentValue) {
             listener.enterIdentValue(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitIdentValue) {
             listener.exitIdentValue(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitIdentValue) {
            return visitor.visitIdentValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FunctionValueContext extends ValueContext {
    public constructor(ctx: ValueContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public valueFunction(): ValueFunctionContext {
        return this.getRuleContext(0, ValueFunctionContext)!;
    }
    public durationOffset(): DurationOffsetContext[];
    public durationOffset(i: number): DurationOffsetContext | null;
    public durationOffset(i?: number): DurationOffsetContext[] | DurationOffsetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DurationOffsetContext);
        }

        return this.getRuleContext(i, DurationOffsetContext);
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterFunctionValue) {
             listener.enterFunctionValue(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitFunctionValue) {
             listener.exitFunctionValue(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitFunctionValue) {
            return visitor.visitFunctionValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueFunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionName(): FunctionNameContext {
        return this.getRuleContext(0, FunctionNameContext)!;
    }
    public callArguments(): CallArgumentsContext {
        return this.getRuleContext(0, CallArgumentsContext)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_valueFunction;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterValueFunction) {
             listener.enterValueFunction(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitValueFunction) {
             listener.exitValueFunction(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitValueFunction) {
            return visitor.visitValueFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DurationOffsetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public sign(): SignContext {
        return this.getRuleContext(0, SignContext)!;
    }
    public DURATION(): antlr.TerminalNode {
        return this.getToken(PQLParser.DURATION, 0)!;
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_durationOffset;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterDurationOffset) {
             listener.enterDurationOffset(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitDurationOffset) {
             listener.exitDurationOffset(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitDurationOffset) {
            return visitor.visitDurationOffset(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(PQLParser.MINUS, 0);
    }
    public override get ruleIndex(): number {
        return PQLParser.RULE_sign;
    }
    public override enterRule(listener: PQLListener): void {
        if(listener.enterSign) {
             listener.enterSign(this);
        }
    }
    public override exitRule(listener: PQLListener): void {
        if(listener.exitSign) {
             listener.exitSign(this);
        }
    }
    public override accept<Result>(visitor: PQLVisitor<Result>): Result | null {
        if (visitor.visitSign) {
            return visitor.visitSign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
