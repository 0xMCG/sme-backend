import { ConfigService } from '@nestjs/config';
import { NodeCommand } from './command';
import { PythonService } from './python/python.service';

const nodeCommand = new NodeCommand(new ConfigService(), new PythonService());

nodeCommand.run(process.argv);
