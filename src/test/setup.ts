import {afterEach} from 'vitest'
import {cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'


//to clean after tests
afterEach(() => {
    cleanup()
})
