import { ConfigService } from '@nestjs/config';
import { NodeCommand } from './command';

const nodeCommand = new NodeCommand(new ConfigService());

nodeCommand.run(process.argv);
