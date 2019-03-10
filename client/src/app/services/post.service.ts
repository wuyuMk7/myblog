import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as moment from 'moment';

import { Post } from '../models/post';

@Injectable({
    providedIn: 'root',
})

export class PostService {
  posts: Post[] = [
    new Post({
      id: '1',
      title: 'test',
      url: 'test',
      tags: [],
      desc: 'test123',
      content: `Enabling Networking under QEMU

The run-zircon script, when given the -N argument will attempt to create a network interface using the Linux tun/tap network device named “qemu”. QEMU does not need to be run with any special privileges for this, but you need to create a persistent tun/tap device ahead of time (which does require you be root):

On Linux:sudo apt-get install uml-utilities
sudo tunctl -u $USER -t qemu
sudo ifconfig qemu up
This is sufficient to enable link local IPv6 (as the loglistener tool uses).

On macOS:

macOS does not support tun/tap devices out of the box; however, there is a widely used set of kernel extensions called tuntaposx which can be downloaded here. Once the installer completes, the extensions will create up to 16 tun/tap devices. The run-zircon-x64 script uses /dev/tap0.

sudo chown $USER /dev/tap0

### Run zircon in QEMU, which will open /dev/tap0
./scripts/run-zircon-x86 -N

### (In a different window) bring up tap0 with a link local IPv6 address
sudo ifconfig tap0 inet6 fc00::/7 up
let formula = <$formula \\displaystyle f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} \\,d\\xi formula$>`,
      comments: [
        {
          id: '1',
          author: 'yyy',
          email: '',
          createdAt: '',
          content: 'test',
          replies: [],
        },
        {
          id: '2',
          author: 'yyy',
          email: '',
          createdAt: '',
          content: 'testin',
          replies: [
            {
              id: '3',
              author: 'kkk',
              email: '',
              createdAt: '',
              content: 'ppp',
              replies: [],
            }
          ],
        },

      ],
      createdAt: '2018-07-22T08:00:23Z',
      viewCount: 10,
      commentCount: 0,
      like: 5,
    }),
    new Post({
      id: '2',
      title: 'test2',
      url: 'test2',
      tags: ["1","bb","qq"],
      desc: 'Detailed instructions for obtaining and building Fuchsia are available from the Getting Started guide, but we\'ll assume here that the target system is x86-based and that you want to build a complete system. To configure our build for this we can run fx set x64 and then build with fx full-build ...',
      content: 'test45678',
      comments: [],
      createdAt: '2018-07-20T12:23:30Z',
      viewCount: 10,
      commentCount: 0,
      like: 5,

    }),
  ];

  constructor() {
    this.posts.map(post => post.period = moment(post.createdAt).fromNow());
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  getPost(name: string): Observable<Post> {
    return of(this.posts[0]);
  }

  getPostById(id: string): Observable<Post> {
    return of(this.posts[1]);
  }
}
