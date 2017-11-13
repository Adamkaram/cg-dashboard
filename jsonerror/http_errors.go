package jsonerror

// Code generated by go generate. DO NOT EDIT.
// This file was generated by robots at
// 2017-11-13 15:41:16.801557659 +1100 AEDT m=+0.001884940

import "net/http"

var BadRequestResponse = Response{
	Error: Error{
		Code:    "badRequest",
		Message: "Bad request",
	},
}

func NewBadRequestResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "badRequest",
			Message: message,
		},
	}
}

func (ew Writer) WriteBadRequest(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusBadRequest, BadRequestResponse, nil)
}

func (ew Writer) WriteBadRequestErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusBadRequest
	resp := BadRequestResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var UnauthorizedResponse = Response{
	Error: Error{
		Code:    "unauthorized",
		Message: "Unauthorized",
	},
}

func NewUnauthorizedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "unauthorized",
			Message: message,
		},
	}
}

func (ew Writer) WriteUnauthorized(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusUnauthorized, UnauthorizedResponse, nil)
}

func (ew Writer) WriteUnauthorizedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusUnauthorized
	resp := UnauthorizedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var PaymentRequiredResponse = Response{
	Error: Error{
		Code:    "paymentRequired",
		Message: "Payment required",
	},
}

func NewPaymentRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "paymentRequired",
			Message: message,
		},
	}
}

func (ew Writer) WritePaymentRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusPaymentRequired, PaymentRequiredResponse, nil)
}

func (ew Writer) WritePaymentRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusPaymentRequired
	resp := PaymentRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var ForbiddenResponse = Response{
	Error: Error{
		Code:    "forbidden",
		Message: "Forbidden",
	},
}

func NewForbiddenResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "forbidden",
			Message: message,
		},
	}
}

func (ew Writer) WriteForbidden(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusForbidden, ForbiddenResponse, nil)
}

func (ew Writer) WriteForbiddenErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusForbidden
	resp := ForbiddenResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var NotFoundResponse = Response{
	Error: Error{
		Code:    "notFound",
		Message: "Not found",
	},
}

func NewNotFoundResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "notFound",
			Message: message,
		},
	}
}

func (ew Writer) WriteNotFound(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusNotFound, NotFoundResponse, nil)
}

func (ew Writer) WriteNotFoundErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusNotFound
	resp := NotFoundResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var MethodNotAllowedResponse = Response{
	Error: Error{
		Code:    "methodNotAllowed",
		Message: "Method not allowed",
	},
}

func NewMethodNotAllowedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "methodNotAllowed",
			Message: message,
		},
	}
}

func (ew Writer) WriteMethodNotAllowed(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusMethodNotAllowed, MethodNotAllowedResponse, nil)
}

func (ew Writer) WriteMethodNotAllowedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusMethodNotAllowed
	resp := MethodNotAllowedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var NotAcceptableResponse = Response{
	Error: Error{
		Code:    "notAcceptable",
		Message: "Not acceptable",
	},
}

func NewNotAcceptableResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "notAcceptable",
			Message: message,
		},
	}
}

func (ew Writer) WriteNotAcceptable(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusNotAcceptable, NotAcceptableResponse, nil)
}

func (ew Writer) WriteNotAcceptableErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusNotAcceptable
	resp := NotAcceptableResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var ProxyAuthRequiredResponse = Response{
	Error: Error{
		Code:    "proxyAuthenticationRequired",
		Message: "Proxy authentication required",
	},
}

func NewProxyAuthRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "proxyAuthenticationRequired",
			Message: message,
		},
	}
}

func (ew Writer) WriteProxyAuthRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusProxyAuthRequired, ProxyAuthRequiredResponse, nil)
}

func (ew Writer) WriteProxyAuthRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusProxyAuthRequired
	resp := ProxyAuthRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var RequestTimeoutResponse = Response{
	Error: Error{
		Code:    "requestTimeout",
		Message: "Request timeout",
	},
}

func NewRequestTimeoutResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "requestTimeout",
			Message: message,
		},
	}
}

func (ew Writer) WriteRequestTimeout(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusRequestTimeout, RequestTimeoutResponse, nil)
}

func (ew Writer) WriteRequestTimeoutErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusRequestTimeout
	resp := RequestTimeoutResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var ConflictResponse = Response{
	Error: Error{
		Code:    "conflict",
		Message: "Conflict",
	},
}

func NewConflictResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "conflict",
			Message: message,
		},
	}
}

func (ew Writer) WriteConflict(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusConflict, ConflictResponse, nil)
}

func (ew Writer) WriteConflictErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusConflict
	resp := ConflictResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var GoneResponse = Response{
	Error: Error{
		Code:    "gone",
		Message: "Gone",
	},
}

func NewGoneResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "gone",
			Message: message,
		},
	}
}

func (ew Writer) WriteGone(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusGone, GoneResponse, nil)
}

func (ew Writer) WriteGoneErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusGone
	resp := GoneResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var LengthRequiredResponse = Response{
	Error: Error{
		Code:    "lengthRequired",
		Message: "Length required",
	},
}

func NewLengthRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "lengthRequired",
			Message: message,
		},
	}
}

func (ew Writer) WriteLengthRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusLengthRequired, LengthRequiredResponse, nil)
}

func (ew Writer) WriteLengthRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusLengthRequired
	resp := LengthRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var PreconditionFailedResponse = Response{
	Error: Error{
		Code:    "preconditionFailed",
		Message: "Precondition failed",
	},
}

func NewPreconditionFailedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "preconditionFailed",
			Message: message,
		},
	}
}

func (ew Writer) WritePreconditionFailed(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusPreconditionFailed, PreconditionFailedResponse, nil)
}

func (ew Writer) WritePreconditionFailedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusPreconditionFailed
	resp := PreconditionFailedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var RequestEntityTooLargeResponse = Response{
	Error: Error{
		Code:    "requestEntityTooLarge",
		Message: "Request entity too large",
	},
}

func NewRequestEntityTooLargeResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "requestEntityTooLarge",
			Message: message,
		},
	}
}

func (ew Writer) WriteRequestEntityTooLarge(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusRequestEntityTooLarge, RequestEntityTooLargeResponse, nil)
}

func (ew Writer) WriteRequestEntityTooLargeErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusRequestEntityTooLarge
	resp := RequestEntityTooLargeResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var RequestURITooLongResponse = Response{
	Error: Error{
		Code:    "requestURITooLong",
		Message: "Request URI too long",
	},
}

func NewRequestURITooLongResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "requestURITooLong",
			Message: message,
		},
	}
}

func (ew Writer) WriteRequestURITooLong(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusRequestURITooLong, RequestURITooLongResponse, nil)
}

func (ew Writer) WriteRequestURITooLongErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusRequestURITooLong
	resp := RequestURITooLongResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var UnsupportedMediaTypeResponse = Response{
	Error: Error{
		Code:    "unsupportedMediaType",
		Message: "Unsupported media type",
	},
}

func NewUnsupportedMediaTypeResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "unsupportedMediaType",
			Message: message,
		},
	}
}

func (ew Writer) WriteUnsupportedMediaType(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusUnsupportedMediaType, UnsupportedMediaTypeResponse, nil)
}

func (ew Writer) WriteUnsupportedMediaTypeErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusUnsupportedMediaType
	resp := UnsupportedMediaTypeResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var RequestedRangeNotSatisfiableResponse = Response{
	Error: Error{
		Code:    "requestedRangeNotSatisfiable",
		Message: "Requested range not satisfiable",
	},
}

func NewRequestedRangeNotSatisfiableResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "requestedRangeNotSatisfiable",
			Message: message,
		},
	}
}

func (ew Writer) WriteRequestedRangeNotSatisfiable(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusRequestedRangeNotSatisfiable, RequestedRangeNotSatisfiableResponse, nil)
}

func (ew Writer) WriteRequestedRangeNotSatisfiableErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusRequestedRangeNotSatisfiable
	resp := RequestedRangeNotSatisfiableResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var ExpectationFailedResponse = Response{
	Error: Error{
		Code:    "expectationFailed",
		Message: "Expectation failed",
	},
}

func NewExpectationFailedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "expectationFailed",
			Message: message,
		},
	}
}

func (ew Writer) WriteExpectationFailed(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusExpectationFailed, ExpectationFailedResponse, nil)
}

func (ew Writer) WriteExpectationFailedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusExpectationFailed
	resp := ExpectationFailedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var TeapotResponse = Response{
	Error: Error{
		Code:    "imATeapot",
		Message: "Im a teapot",
	},
}

func NewTeapotResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "imATeapot",
			Message: message,
		},
	}
}

func (ew Writer) WriteTeapot(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusTeapot, TeapotResponse, nil)
}

func (ew Writer) WriteTeapotErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusTeapot
	resp := TeapotResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var UnprocessableEntityResponse = Response{
	Error: Error{
		Code:    "unprocessableEntity",
		Message: "Unprocessable entity",
	},
}

func NewUnprocessableEntityResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "unprocessableEntity",
			Message: message,
		},
	}
}

func (ew Writer) WriteUnprocessableEntity(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusUnprocessableEntity, UnprocessableEntityResponse, nil)
}

func (ew Writer) WriteUnprocessableEntityErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusUnprocessableEntity
	resp := UnprocessableEntityResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var LockedResponse = Response{
	Error: Error{
		Code:    "locked",
		Message: "Locked",
	},
}

func NewLockedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "locked",
			Message: message,
		},
	}
}

func (ew Writer) WriteLocked(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusLocked, LockedResponse, nil)
}

func (ew Writer) WriteLockedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusLocked
	resp := LockedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var FailedDependencyResponse = Response{
	Error: Error{
		Code:    "failedDependency",
		Message: "Failed dependency",
	},
}

func NewFailedDependencyResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "failedDependency",
			Message: message,
		},
	}
}

func (ew Writer) WriteFailedDependency(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusFailedDependency, FailedDependencyResponse, nil)
}

func (ew Writer) WriteFailedDependencyErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusFailedDependency
	resp := FailedDependencyResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var UpgradeRequiredResponse = Response{
	Error: Error{
		Code:    "upgradeRequired",
		Message: "Upgrade required",
	},
}

func NewUpgradeRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "upgradeRequired",
			Message: message,
		},
	}
}

func (ew Writer) WriteUpgradeRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusUpgradeRequired, UpgradeRequiredResponse, nil)
}

func (ew Writer) WriteUpgradeRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusUpgradeRequired
	resp := UpgradeRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var PreconditionRequiredResponse = Response{
	Error: Error{
		Code:    "preconditionRequired",
		Message: "Precondition required",
	},
}

func NewPreconditionRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "preconditionRequired",
			Message: message,
		},
	}
}

func (ew Writer) WritePreconditionRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusPreconditionRequired, PreconditionRequiredResponse, nil)
}

func (ew Writer) WritePreconditionRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusPreconditionRequired
	resp := PreconditionRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var TooManyRequestsResponse = Response{
	Error: Error{
		Code:    "tooManyRequests",
		Message: "Too many requests",
	},
}

func NewTooManyRequestsResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "tooManyRequests",
			Message: message,
		},
	}
}

func (ew Writer) WriteTooManyRequests(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusTooManyRequests, TooManyRequestsResponse, nil)
}

func (ew Writer) WriteTooManyRequestsErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusTooManyRequests
	resp := TooManyRequestsResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var RequestHeaderFieldsTooLargeResponse = Response{
	Error: Error{
		Code:    "requestHeaderFieldsTooLarge",
		Message: "Request header fields too large",
	},
}

func NewRequestHeaderFieldsTooLargeResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "requestHeaderFieldsTooLarge",
			Message: message,
		},
	}
}

func (ew Writer) WriteRequestHeaderFieldsTooLarge(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusRequestHeaderFieldsTooLarge, RequestHeaderFieldsTooLargeResponse, nil)
}

func (ew Writer) WriteRequestHeaderFieldsTooLargeErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusRequestHeaderFieldsTooLarge
	resp := RequestHeaderFieldsTooLargeResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var UnavailableForLegalReasonsResponse = Response{
	Error: Error{
		Code:    "unavailableForLegalReasons",
		Message: "Unavailable for legal reasons",
	},
}

func NewUnavailableForLegalReasonsResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "unavailableForLegalReasons",
			Message: message,
		},
	}
}

func (ew Writer) WriteUnavailableForLegalReasons(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusUnavailableForLegalReasons, UnavailableForLegalReasonsResponse, nil)
}

func (ew Writer) WriteUnavailableForLegalReasonsErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusUnavailableForLegalReasons
	resp := UnavailableForLegalReasonsResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var InternalServerErrorResponse = Response{
	Error: Error{
		Code:    "internalServerError",
		Message: "Internal server error",
	},
}

func NewInternalServerErrorResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "internalServerError",
			Message: message,
		},
	}
}

func (ew Writer) WriteInternalServerError(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusInternalServerError, InternalServerErrorResponse, nil)
}

func (ew Writer) WriteInternalServerErrorErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusInternalServerError
	resp := InternalServerErrorResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var NotImplementedResponse = Response{
	Error: Error{
		Code:    "notImplemented",
		Message: "Not implemented",
	},
}

func NewNotImplementedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "notImplemented",
			Message: message,
		},
	}
}

func (ew Writer) WriteNotImplemented(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusNotImplemented, NotImplementedResponse, nil)
}

func (ew Writer) WriteNotImplementedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusNotImplemented
	resp := NotImplementedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var BadGatewayResponse = Response{
	Error: Error{
		Code:    "badGateway",
		Message: "Bad gateway",
	},
}

func NewBadGatewayResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "badGateway",
			Message: message,
		},
	}
}

func (ew Writer) WriteBadGateway(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusBadGateway, BadGatewayResponse, nil)
}

func (ew Writer) WriteBadGatewayErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusBadGateway
	resp := BadGatewayResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var ServiceUnavailableResponse = Response{
	Error: Error{
		Code:    "serviceUnavailable",
		Message: "Service unavailable",
	},
}

func NewServiceUnavailableResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "serviceUnavailable",
			Message: message,
		},
	}
}

func (ew Writer) WriteServiceUnavailable(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusServiceUnavailable, ServiceUnavailableResponse, nil)
}

func (ew Writer) WriteServiceUnavailableErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusServiceUnavailable
	resp := ServiceUnavailableResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var GatewayTimeoutResponse = Response{
	Error: Error{
		Code:    "gatewayTimeout",
		Message: "Gateway timeout",
	},
}

func NewGatewayTimeoutResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "gatewayTimeout",
			Message: message,
		},
	}
}

func (ew Writer) WriteGatewayTimeout(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusGatewayTimeout, GatewayTimeoutResponse, nil)
}

func (ew Writer) WriteGatewayTimeoutErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusGatewayTimeout
	resp := GatewayTimeoutResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var HTTPVersionNotSupportedResponse = Response{
	Error: Error{
		Code:    "httpVersionNotSupported",
		Message: "HTTP version not supported",
	},
}

func NewHTTPVersionNotSupportedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "httpVersionNotSupported",
			Message: message,
		},
	}
}

func (ew Writer) WriteHTTPVersionNotSupported(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusHTTPVersionNotSupported, HTTPVersionNotSupportedResponse, nil)
}

func (ew Writer) WriteHTTPVersionNotSupportedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusHTTPVersionNotSupported
	resp := HTTPVersionNotSupportedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var VariantAlsoNegotiatesResponse = Response{
	Error: Error{
		Code:    "variantAlsoNegotiates",
		Message: "Variant also negotiates",
	},
}

func NewVariantAlsoNegotiatesResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "variantAlsoNegotiates",
			Message: message,
		},
	}
}

func (ew Writer) WriteVariantAlsoNegotiates(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusVariantAlsoNegotiates, VariantAlsoNegotiatesResponse, nil)
}

func (ew Writer) WriteVariantAlsoNegotiatesErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusVariantAlsoNegotiates
	resp := VariantAlsoNegotiatesResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var InsufficientStorageResponse = Response{
	Error: Error{
		Code:    "insufficientStorage",
		Message: "Insufficient storage",
	},
}

func NewInsufficientStorageResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "insufficientStorage",
			Message: message,
		},
	}
}

func (ew Writer) WriteInsufficientStorage(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusInsufficientStorage, InsufficientStorageResponse, nil)
}

func (ew Writer) WriteInsufficientStorageErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusInsufficientStorage
	resp := InsufficientStorageResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var LoopDetectedResponse = Response{
	Error: Error{
		Code:    "loopDetected",
		Message: "Loop detected",
	},
}

func NewLoopDetectedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "loopDetected",
			Message: message,
		},
	}
}

func (ew Writer) WriteLoopDetected(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusLoopDetected, LoopDetectedResponse, nil)
}

func (ew Writer) WriteLoopDetectedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusLoopDetected
	resp := LoopDetectedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var NotExtendedResponse = Response{
	Error: Error{
		Code:    "notExtended",
		Message: "Not extended",
	},
}

func NewNotExtendedResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "notExtended",
			Message: message,
		},
	}
}

func (ew Writer) WriteNotExtended(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusNotExtended, NotExtendedResponse, nil)
}

func (ew Writer) WriteNotExtendedErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusNotExtended
	resp := NotExtendedResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}

var NetworkAuthenticationRequiredResponse = Response{
	Error: Error{
		Code:    "networkAuthenticationRequired",
		Message: "Network authentication required",
	},
}

func NewNetworkAuthenticationRequiredResponse(message string) Response {
	return Response{
		Error: Error{
			Code:    "networkAuthenticationRequired",
			Message: message,
		},
	}
}

func (ew Writer) WriteNetworkAuthenticationRequired(w http.ResponseWriter, r *http.Request) {
	ew.write(w, r, http.StatusNetworkAuthenticationRequired, NetworkAuthenticationRequiredResponse, nil)
}

func (ew Writer) WriteNetworkAuthenticationRequiredErr(w http.ResponseWriter, r *http.Request, err error) {
	status := http.StatusNetworkAuthenticationRequired
	resp := NetworkAuthenticationRequiredResponse.WithErr(err)
	ew.write(w, r, status, resp, err)
}
