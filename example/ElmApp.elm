port module ElmApp exposing (main)

import Html exposing (..)
import Html.Events exposing (onClick)


-- SUBSCRIPTIONS


port value : (String -> msg) -> Sub msg


port onClick : () -> Cmd msg


subscriptions : Model -> Sub Msg
subscriptions model =
    value NewValue



-- model


type alias Model =
    { value : String
    }


init : Model -> ( Model, Cmd Msg )
init props =
    ( props, Cmd.none )



-- update


type Msg
    = NewValue String
    | Click


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewValue value ->
            ( { model | value = value }, Cmd.none )

        Click ->
            ( model, onClick () )



-- view


view : Model -> Html Msg
view model =
    div
        [ Html.Events.onClick Click ]
        [ Html.text model.value ]


main : Program Model Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
