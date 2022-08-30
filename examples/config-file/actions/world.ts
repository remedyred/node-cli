import {cli} from '../../../src'
import {out} from '@snickbit/out'

export default async argv => cli(argv)
	.run(async (args, config) => {
		out.info('ACTION - WORLD', {args, config})
		out.done('Done')
	})
