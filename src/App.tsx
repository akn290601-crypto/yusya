import { useEffect, useReducer, useState } from 'react'
import { gameReducer, initialState } from './game/gameReducer'
import { loadGame, saveGame, clearSave } from './game/storage'
import { TitleScreen } from './components/TitleScreen'
import { CharacterCreate } from './components/CharacterCreate'
import { MainScreen } from './components/MainScreen'
import { EventModal } from './components/EventModal'
import { CheckpointModal } from './components/CheckpointModal'
import { ResultScreen } from './components/ResultScreen'

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [hasSave, setHasSave] = useState(false)

  useEffect(() => {
    setHasSave(loadGame() !== null)
  }, [])

  useEffect(() => {
    if (state.phase === 'title') return
    saveGame(state)
    setHasSave(true)
  }, [state])

  function handleRestart() {
    clearSave()
    setHasSave(false)
    dispatch({ type: 'RESTART' })
  }

  if (state.phase === 'title') {
    return (
      <TitleScreen
        hasSave={hasSave}
        onStart={() => dispatch({ type: 'START_CREATE' })}
        onContinue={() => {
          const saved = loadGame()
          if (saved) dispatch({ type: 'LOAD', state: saved })
        }}
      />
    )
  }

  if (state.phase === 'create') {
    return <CharacterCreate onCreate={(name) => dispatch({ type: 'CREATE_CHARACTER', name })} />
  }

  if (!state.character) {
    return null
  }

  if (state.phase === 'result') {
    return (
      <ResultScreen
        character={state.character}
        rank={state.finalRank ?? '-'}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <>
      <MainScreen
        character={state.character}
        lastMessage={state.lastMessage}
        onTrain={(trainingId) => dispatch({ type: 'TRAIN', trainingId })}
        onRest={() => dispatch({ type: 'REST' })}
        onOuting={() => dispatch({ type: 'OUTING' })}
      />
      {state.phase === 'event' && state.pendingEvent && (
        <EventModal
          event={state.pendingEvent}
          onChoose={(choiceIndex) => dispatch({ type: 'RESOLVE_EVENT', choiceIndex })}
        />
      )}
      {state.phase === 'checkpoint' && state.checkpointRank && (
        <CheckpointModal
          rank={state.checkpointRank}
          onContinue={() => dispatch({ type: 'ACK_CHECKPOINT' })}
        />
      )}
    </>
  )
}

export default App
